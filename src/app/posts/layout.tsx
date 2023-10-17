import React, { ReactNode } from 'react'
import s from '@/styles/PostPage.module.css'

export default async function layout({ children }: { children: ReactNode }) {
    return (
        <div className={s.container}>
            <h1 className="hidden">Posts</h1>
            {children}
        </div>
    )
}
