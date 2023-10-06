import ItemComponent from '@/components/item/ItemComponent';
import { getPaintingsFull } from '@/app/api/peinture/getPaintings';
import s from '@/styles/ItemPage.module.css';
import { PaintingFull } from '@/app/api/peinture/painting';

export default async function Page() {
  const paintings = await getPaintingsFull();
  return (
    <div className={s.container}>
      <h1 className="hidden">Les sculptures</h1>
      <div className={s.grid}>
        {paintings.length > 0 &&
          paintings.map((painting: PaintingFull) => (
            <ItemComponent key={painting.id} item={painting} />
          ))}
      </div>
    </div>
  );
}
