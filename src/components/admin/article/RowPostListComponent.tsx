import Image from 'next/legacy/image';

import DeleteButton from '@/components/admin/form/DeleteButton';
import UpdateButton from '@/components/admin/form/UpdateButton';
import { TYPE } from '@/constants';
import s from '../ListComponent.module.css';
import { PostFull } from '@/app/api/post/post';

interface Props {
  post: PostFull;
}

export default function RowPostListComponent({ post }: Props) {
  const src = post.mainImage?.filename
    ? `/images/post/${post.mainImage?.filename}`
    : post.images[0].filename
    ? `/images/post/${post.images[0].filename}`
    : null;

  return (
    <ul className={s.item}>
      <li className={s.itemTitle}>
        <span className={s.name}>{post.title}</span>
      </li>
      <li className={s.itemImage}>
        {src !== null && <Image src={src} alt="image" height={50} width={50} />}
      </li>
      <li className={s.itemIcon}>
        <UpdateButton item={post} type={TYPE.POST} />
      </li>
      <li className={s.itemIcon}>
        <DeleteButton api={`api/post/delete/${post.id}`} />
      </li>
    </ul>
  );
}
