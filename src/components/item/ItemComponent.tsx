import { PaintingFull, SculptureFull } from '@/interfaces';
import { TYPE } from '@/constants';
import s from './ItemComponent.module.css';
import ImageWithLightbox from '@/components/image/image-lightbox';

interface Props {
  item: SculptureFull | PaintingFull;
}
export default function ItemComponent({ item }: Props) {
  const isSculpture = item.type === TYPE.SCULPTURE;

  return (
    <article id={`${item.id}`} className={s.article}>
      <ImageWithLightbox
        images={isSculpture ? item.images : [item.image]}
        alt={`${item.title} - ${item.type} de Thierry Casters`}
        type={item.type}
      />
      <div className={s.info}>
        <h1>{item.title}</h1>
        <p>
          {item.height} cm x {item.width} cm{' '}
          {isSculpture ? ` x ${item.length} cm` : ''}
          {' - '}
          <time>{new Date(item.date).toLocaleDateString()}</time>
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
