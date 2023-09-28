'use client';

import React from 'react';
import s from '../ListComponent.module.css';
import RowPostListComponent from '@/components/admin/article/RowPostListComponent';
import { PostFull } from '@/app/api/post/post';

interface Props {
  posts?: PostFull[];
}
export default function PostListComponent({ posts }: Props) {
  const title = 'Liste des posts';

  return (
    <div className={s.listContainer}>
      <h2>{title}</h2>
      <div className={s.list}>
        {posts &&
          posts.map((post: PostFull) => {
            return <RowPostListComponent key={post.id} post={post} />;
          })}
      </div>
    </div>
  );
}
