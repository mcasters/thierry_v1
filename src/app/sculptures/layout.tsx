import { ReactNode } from 'react'
import s from '@/styles/ItemPage.module.css'

export default async function layout({ children }: { children: ReactNode }) {
    return (
        <div className={s.container}>
            <h1 className="hidden">Les sculptures</h1>
            <div className={s.sculptureGrid}>{children}</div>
        </div>
    )
}
