import ItemComponent from '@/components/item/ItemComponent';
import { getPaintingsFullByCategory } from '@/app/api/peinture/getPaintings';
import s from '@/styles/ItemPage.module.css';

export default async function Page({
  params,
}: {
  params: { category: string };
}) {
  const paintings = await getPaintingsFullByCategory(params.category);
  const categoryTitle =
    params.category === 'no-category'
      ? 'Sans catégorie'
      : paintings[0]?.category.value;
  return (
    <div className={s.container}>
      <h1 className="hidden">Les peintures</h1>
      <h2 className={s.categoryTitle}>{categoryTitle}</h2>
      <div className={s.grid}>
        {paintings.map((painting) => (
          <ItemComponent key={painting.id} item={painting} />
        ))}
      </div>
    </div>
  );
}
