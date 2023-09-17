import React from 'react';

import { Item } from '@/interfaces';
import { TYPE } from '@/constants';
import s from './ItemComponent.module.css';
import MyLightbox from '@/components/image/lightbox';

interface Props {
  item: Item;
}
export default function ItemComponent({ item }: Props) {
  const isSculpture = item.type === TYPE.SCULPTURE;

  return (
    <section>
      <article id={`${item.id}`} className={s.article}>
        <h1>{item.title}</h1>
        <p className={s.info}>
          {item.height} cm x {item.width} cm{' '}
          {isSculpture ? ` par ${item.length} cm` : ''}
          <br />
          <time>{new Date(item.date).toLocaleDateString()}</time>
          <br />
          {item.technique}
          <br />
          {item.description !== '' && item.description}
        </p>
        <div>
          <MyLightbox
            images={isSculpture ? item.images : [item.image]}
            alt={`${item.title} - ${item.type} de Thierry Casters`}
            type={item.type}
          />
        </div>
        <p>
          {item.isToSell ? `prix : ${item.price} euros` : ''}
          {item.sold ? 'vendu' : ''}
        </p>
      </article>
    </section>
  );
}
