'use client';

import ImageLightbox from '@/components/image/ImageLightbox';
import s from './PostComponent.module.css';
import { PostFull } from '@/app/api/post/post';
import Gallery from '@/components/image/Gallery';
import { TYPE } from '@/constants';
import { getMainImage } from '@/utils/commonUtils';

interface Props {
  post: PostFull;
}
export default function PostComponent({ post }: Props) {
  const mainImage = getMainImage(post);
  return (
    <>
      <article className={s.postContainer}>
        <div className={s.mainImage}>
          {mainImage && (
            <ImageLightbox
              images={[mainImage]}
              alt={`${post.title} - Photo de Thierry Casters`}
              type={TYPE.POST}
              maxHeight={30}
              isCentred={true}
            />
          )}
        </div>
        <div className={s.info}>
          <h2>{post.title}</h2>
          <time>{new Date(post.date).getFullYear()}</time>
          <p>
            <br />
            {post.text}
          </p>
        </div>
        <div className={s.gallery}>
          <Gallery
            images={post.images.filter((i) => !i.isMain)}
            type={TYPE.POST}
          />
        </div>
      </article>
      <div className="separate"></div>
    </>
  );
}
