import s from '@/styles/ItemPage.module.css';
import ItemComponent from '@/components/item/ItemComponent';
import { getSculpturesFullByCategory } from '@/app/api/sculpture/getSculptures';

export default async function Page({
  params,
}: {
  params: { category: string };
}) {
  const sculptures = await getSculpturesFullByCategory(params.category);

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
