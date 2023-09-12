import React from 'react';
import Image from 'next/image';

import { Item } from '@/interfaces';
import Slider from '@/components/image/Slider';
import s from './ItemComponent.module.css';
import { TYPE } from '@/constants';

interface Props {
  item: Item;
}
export default function ItemComponent({ item }: Props) {
  const isSculpture = item.type === TYPE.SCULPTURE;
  const src = `/images/${item.type}/${
    isSculpture ? item.images[0].filename : item.image.filename
  }`;
  return (
    <section className={s.section}>
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
          {item.description}
          <br />
        </p>
        <div>
          <Slider
            images={isSculpture ? item.images : [item.image]}
            alt={item.title}
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
