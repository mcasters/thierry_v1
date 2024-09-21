import ItemComponent from "@/components/item/ItemComponent";
import { getSculpturesFull } from "@/app/api/sculpture/getSculptures";
import { SculptureFull } from "@/lib/db/item";
import s from "@/styles/ItemPage.module.css";

export default async function Page() {
  const sculptures: SculptureFull[] = await getSculpturesFull();
  return (
    <div className={s.sculptureGrid}>
      {sculptures.length > 0 &&
        sculptures.map((sculpture: SculptureFull) => (
          <ItemComponent key={sculpture.id} item={sculpture} />
        ))}
    </div>
  );
}
