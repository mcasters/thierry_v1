import ItemComponent from '@/components/item/ItemComponent';
import { getSculpturesFull } from '@/app/api/sculpture/getSculptures';
import s from '@/styles/ItemPage.module.css';
import { SculptureFull } from '@/app/api/sculpture/sculpture';

export default async function Page() {
  const sculptures = await getSculpturesFull();

  return (
    <div className={s.container}>
      <h1 className="hidden">Les sculptures</h1>
      <div className={s.sculptureGrid}>
        {sculptures.length > 0 &&
          sculptures.map((sculpture: SculptureFull) => (
            <ItemComponent key={sculpture.id} item={sculpture} />
          ))}
      </div>
    </div>
  );
}
