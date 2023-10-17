import React, { ReactNode } from 'react'
import s from '@/styles/presentation.module.css'

export default async function layout({ children }: { children: ReactNode }) {
    return (
        <div className={s.presentationContainer}>
            <h1 className={s.title}>Présentation</h1>
            {children}
        </div>
    )
}
