'use strict';

import _fs from 'fs';
const _path = require('path');
import sharp from 'sharp';

const WEBP = 'image/webp';

class ImageError extends Error {
  constructor(statusCode, message) {
    super(message);
    // ensure an error status is used > 400
    if (statusCode >= 400) {
      this.statusCode = statusCode;
    } else {
      this.statusCode = 500;
    }
  }
}

class ImageOptimizerCache {
  static validateParams(req, query) {
    const deviceSizes = [];
    const imageSizes = [];
    const minimumCacheTTL = 60;

    const { url, w, q } = query;

    const width = parseInt(w, 10);
    const sizes = [...(deviceSizes || []), ...(imageSizes || [])];
    const quality = parseInt(q);
    return {
      url,
      sizes,
      width,
      quality,
      minimumCacheTTL,
    };
  }
  static getCacheKey({ href, width, quality, mimeType }) {
    return getHash([CACHE_VERSION, href, width, quality, mimeType]);
  }

  constructor({ distDir, nextConfig }) {
    this.cacheDir = _path.join(distDir, 'cache', 'images');
    this.nextConfig = nextConfig;
  }

  async get(cacheKey) {
    try {
      const cacheDir = _path.join(this.cacheDir, cacheKey);
      const files = await _fs.promises.readdir(cacheDir);
      const now = Date.now();
      for (const file of files) {
        const [maxAgeSt, expireAtSt, etag, extension] = file.split('.');
        const buffer = await _fs.promises.readFile(_path.join(cacheDir, file));
        const expireAt = Number(expireAtSt);
        const maxAge = Number(maxAgeSt);
        return {
          value: {
            kind: 'IMAGE',
            etag,
            buffer,
            extension,
          },
          revalidateAfter:
            Math.max(maxAge, this.nextConfig.images.minimumCacheTTL) * 1000 +
            Date.now(),
          curRevalidate: maxAge,
          isStale: now > expireAt,
        };
      }
    } catch (_) {
      // failed to read from cache dir, treat as cache miss
    }
    return null;
  }
  async set(cacheKey, value, { revalidate }) {
    const expireAt =
      Math.max(revalidate, this.nextConfig.images.minimumCacheTTL) * 1000 +
      Date.now();
    try {
      await writeToCacheDir(
        _path.join(this.cacheDir, cacheKey),
        value.extension,
        revalidate,
        expireAt,
        value.buffer,
        value.etag,
      );
    } catch (err) {
      console.error(`Failed to write image to cache ${cacheKey}`, err);
    }
  }
}

async function writeToCacheDir(dir, extension, maxAge, expireAt, buffer, etag) {
  const filename = _path.join(
    dir,
    `${maxAge}.${expireAt}.${etag}.${extension}`,
  );
  await _fs.promises
    .rm(dir, {
      recursive: true,
      force: true,
    })
    .catch(() => {});
  await _fs.promises.mkdir(dir, {
    recursive: true,
  });
  await _fs.promises.writeFile(filename, buffer);
}

function parseCacheControl(str) {
  const map = new Map();
  if (!str) {
    return map;
  }
  for (let directive of str.split(',')) {
    let [key, value] = directive.trim().split('=');
    key = key.toLowerCase();
    if (value) {
      value = value.toLowerCase();
    }
    map.set(key, value);
  }
  return map;
}

function getMaxAge(str) {
  const map = parseCacheControl(str);
  if (map) {
    let age = map.get('s-maxage') || map.get('max-age') || '';
    if (age.startsWith('"') && age.endsWith('"')) {
      age = age.slice(1, -1);
    }
    const n = parseInt(age, 10);
    if (!isNaN(n)) {
      return n;
    }
  }
  return 0;
}

async function optimizeImage({ buffer, quality, width, height }) {
  let optimizedBuffer;
  // Begin sharp transformation logic
  const transformer = sharp(buffer, {
    sequentialRead: true,
  });
  transformer.rotate();
  if (height) {
    transformer.resize(width, height);
  } else {
    transformer.resize(width, undefined, {
      withoutEnlargement: true,
    });
  }

  transformer.webp({
    quality,
  });

  optimizedBuffer = await transformer.toBuffer();
  return optimizedBuffer;
}

export async function imageOptimizer(_req, _res, paramsResult) {
  let upstreamBuffer;
  let upstreamType;
  let maxAge;
  const { href, width, quality } = paramsResult;

  const upstreamRes = await fetch(href);
  console.log('//// upstreamRes');
  console.log(upstreamRes);
  if (!upstreamRes.ok) {
    console.error(
      'upstream image response failed for',
      href,
      upstreamRes.status,
    );
    throw new ImageError(
      upstreamRes.status,
      '"url" parameter is valid but upstream response is invalid',
    );
  }
  upstreamBuffer = Buffer.from(await upstreamRes.arrayBuffer());
  maxAge = getMaxAge(upstreamRes.headers.get('Cache-Control'));

  try {
    let optimizedBuffer = await optimizeImage({
      buffer: upstreamBuffer,
      quality,
      width,
    });
    if (optimizedBuffer) {
      return {
        buffer: optimizedBuffer,
        contentType: WEBP,
        maxAge: Math.max(maxAge, 60),
      };
    } else {
      throw new ImageError(500, 'Unable to optimize buffer');
    }
  } catch (error) {
    if (upstreamBuffer && upstreamType) {
      // If we fail to optimize, fallback to the original image
      return {
        buffer: upstreamBuffer,
        contentType: WEBP,
        maxAge: 60,
      };
    } else {
      throw new ImageError(
        400,
        'Unable to optimize image and unable to fallback to upstream image',
      );
    }
  }
}
