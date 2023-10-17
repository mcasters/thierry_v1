import ItemComponent from '@/components/item/ItemComponent'
import { getSculpturesFull } from '@/app/api/sculpture/getSculptures'
import { SculptureFull } from '@/app/api/sculpture/sculpture'

export default async function Page() {
    const sculptures = await getSculpturesFull()

    return (
        sculptures.length > 0 &&
        sculptures.map((sculpture: SculptureFull) => (
            <ItemComponent key={sculpture.id} item={sculpture} />
        ))
    )
}
