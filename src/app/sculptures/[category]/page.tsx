import ItemComponent from '@/components/item/ItemComponent';
import { getSculpturesFullByCategory } from '@/app/api/sculpture/getSculptures';
import s from '@/styles/ItemPage.module.css';

export default async function Page({
  params,
}: {
  params: { category: string };
}) {
  const sculptures = await getSculpturesFullByCategory(params.category);
  const categoryTitle =
    params.category === 'no-category'
      ? 'Sans catégorie'
      : sculptures[0]?.category?.value;

  return (
    <div className={s.container}>
      <h1 className="hidden">Les sculptures</h1>
      <h2 className={s.categoryTitle}>{categoryTitle}</h2>
      <div className={s.sculptureGrid}>
        {sculptures.map((sculpture) => (
          <ItemComponent key={sculpture.id} item={sculpture} />
        ))}
      </div>
    </div>
  );
}
