import s from '@/styles/ItemPage.module.css';
import ItemComponent from '@/components/item/ItemComponent';
import { getPaintingsFullByCategory } from '@/app/api/peinture/route';

export default async function Page({
  params,
}: {
  params: { category: string };
}) {
  const paintings = await getPaintingsFullByCategory(params.category);

  return (
    <div className={s.container}>
      <div className={s.grid}>
        <h1 className="hidden">Les peintures</h1>
        {paintings.map((painting) => (
          <ItemComponent key={painting.id} item={painting} />
        ))}
      </div>
    </div>
  );
}
