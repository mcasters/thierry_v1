'use client';

import { TYPE } from '@/constants';
import ImageLightbox from '@/components/image/ImageLightbox';
import { SculptureFull } from '@/app/api/sculpture/sculpture';
import { PaintingFull } from '@/app/api/peinture/painting';
import s from './ItemComponent.module.css';

interface Props {
  item: SculptureFull | PaintingFull;
}
export default function ItemComponent({ item }: Props) {
  const isSculpture = item.type === TYPE.SCULPTURE;

  return (
    <article id={`${item.id}`} className={s.article}>
      <ImageLightbox
        images={isSculpture ? item.images : [item.image]}
        alt={`${item.title} - ${item.type} de Thierry Casters`}
        type={item.type}
      />
      <div className={s.info}>
        <h2>{item.title}</h2>
        <p>
          {item.height} cm x {item.width} cm{' '}
          {isSculpture ? ` x ${item.length} cm` : ''}
          {' - '}
          <time>{new Date(item.date).getFullYear()}</time>
          <br />
          {item.technique}
          <br />
          {item.description !== '' && item.description}
        </p>
        <p>
          {item.isToSell ? `prix : ${item.price} euros` : ''}
          {item.sold ? 'vendu' : ''}
        </p>
      </div>
    </article>
  );
}
