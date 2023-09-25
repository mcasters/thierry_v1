import s from '@/styles/ItemPage.module.css';
import ItemComponent from '@/components/item/ItemComponent';
import { getSculpturesFull } from '@/app/api/sculpture/getSculptures';

export default async function Page() {
  const sculptures = await getSculpturesFull();

  return (
    <div className={s.container}>
      <div className={s.grid}>
        <h1 className="hidden">Les sculptures</h1>
        {sculptures.map((sculpture) => (
          <ItemComponent key={sculpture.id} item={sculpture} />
        ))}
      </div>
    </div>
  );
}
