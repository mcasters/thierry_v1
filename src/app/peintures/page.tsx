import s from '@/styles/ItemPage.module.css';
import ItemComponent from '@/components/item/ItemComponent';
import { getPaintingsFull } from '@/app/api/peinture/getPaintings';

export default async function Page() {
  const paintings = await getPaintingsFull();

  return (
    <div className={s.container}>
      <div className={s.grid}>
        <h1 className="hidden">Les sculptures</h1>
        {paintings.map((painting) => (
          <ItemComponent key={painting.id} item={painting} />
        ))}
      </div>
    </div>
  );
}
