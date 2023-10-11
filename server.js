const express = require('express');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = '127.0.0.1' || 'localhost';
const port = parseInt(process.env.PORT) || 3000;
const nextServer = next({ dev, hostname, port });
const handle = nextServer.getRequestHandler();

nextServer
  .prepare()
  .then(() => {
    const server = express();

    if (!dev) {
      server.set('trust proxy', 1);
    }

    server.all('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://${hostname}:${port}`);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
