'use client'

import { HexColorPicker } from 'react-colorful'
import { Dispatch, SetStateAction } from 'react'

import s from './AdminThemeComponent.module.css'

interface Props {
    label: string
    color: string
    setColor: Dispatch<SetStateAction<string>>
}

export default function AdminThemeItemComponent({
    label,
    color,
    setColor,
}: Props) {
    return (
        <div className={s.themeContainer}>
            <h3 className={s.title}>{label}</h3>
            <HexColorPicker color={color} onChange={setColor} />
        </div>
    )
}
