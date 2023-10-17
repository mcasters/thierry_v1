import ItemComponent from '@/components/item/ItemComponent'
import { getPaintingsFull } from '@/app/api/peinture/getPaintings'
import { PaintingFull } from '@/app/api/peinture/painting'
import s from '@/styles/ItemPage.module.css'

export default async function Page() {
    const paintings = await getPaintingsFull()
    return (
        <div className={s.grid}>
            {paintings.length > 0 &&
                paintings.map((painting: PaintingFull) => (
                    <ItemComponent key={painting.id} item={painting} />
                ))}
        </div>
    )
}
