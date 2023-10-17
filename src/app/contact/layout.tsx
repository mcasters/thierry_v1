import s from '@/styles/contact.module.css'

export default async function layout({
    children,
}: {
    children: React.ReactNode
}) {
    return <div className={s.contactContainer}>{children}</div>
}
