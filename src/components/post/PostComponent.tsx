'use client';

import ImageWithLightbox from '@/components/image/ImageWithLightbox';
import s from './PostComponent.module.css';
import { PostFull } from '@/app/api/post/post';
import Gallery from '@/components/image/Gallery';
import { TYPE } from '@/constants';

interface Props {
  post: PostFull;
}
export default function PostComponent({ post }: Props) {
  return (
    <article>
      <div className={s.mainImage}>
        {post.mainImage && (
          <ImageWithLightbox
            images={[post.mainImage]}
            alt={`${post.title} - Photo de Thierry Casters`}
            type={TYPE.POST}
          />
        )}
      </div>
      <div className={s.info}>
        <h2>{post.title}</h2>
        <time>{new Date(post.date).getFullYear()}</time>
        <p>
          <br />
          {post.content}
        </p>
      </div>
      <div className={s.gallery}>
        <Gallery images={post.images} type={TYPE.POST} />
      </div>
    </article>
  );
}
