'use client';

import ImageWithLightbox from '@/components/image/imagelightbox';
import s from './PostComponent.module.css';
import { PostFull } from '@/app/api/post/post';
import Gallery from '@/components/image/gallery';
import { TYPE } from '@/constants';

interface Props {
  post: PostFull;
}
export default function PostComponent({ post }: Props) {
  return (
    <article>
      <div className={s.mainImage}>
        <ImageWithLightbox
          images={[post.mainImage]}
          alt={`${post.title} - Photo de Thierry Casters`}
          type={TYPE.POST}
        />
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
        <Gallery images={post.images} />
      </div>
    </article>
  );
}
