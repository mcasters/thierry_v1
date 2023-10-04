import PostForm from '@/components/admin/form/PostForm';
import PostListComponent from '@/components/admin/post/PostListComponent';
import { getPostsFull } from '@/app/api/post/getPosts';

export default async function Sculptures() {
  const posts = await getPostsFull();

  return (
    <>
      <PostListComponent posts={posts} />
      <PostForm />
    </>
  );
}
