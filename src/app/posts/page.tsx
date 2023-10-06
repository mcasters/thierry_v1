import { getPostsFull } from '@/app/api/post/getPosts';
import s from '@/styles/PostPage.module.css';
import React from 'react';
import PostComponent from '@/components/post/PostComponent';
import { PostFull } from '@/app/api/post/post';

export default async function Posts() {
  const posts = await getPostsFull();

  return (
    <div className={s.container}>
      <h1 className="hidden">Posts</h1>
      {posts.length > 0 &&
        posts.map((post: PostFull) => (
          <PostComponent key={post.id} post={post} />
        ))}
    </div>
  );
}
