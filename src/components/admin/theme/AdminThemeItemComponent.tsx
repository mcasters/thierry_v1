'use client'

import { HexColorPicker } from 'react-colorful'
import { useCallback, useState } from 'react'

import s from './AdminThemeComponent.module.css'
import useOnClickOutside from '@/components/hooks/useOnClickOutside'

interface Props {
    label: string
    color: string
    setColor: (newColor: string) => void
}

export default function AdminThemeItemComponent({
    label,
    color,
    setColor,
}: Props) {
    const [isOpen, toggle] = useState(false)

    const close = useCallback(() => toggle(false), [])
    const popup = useOnClickOutside(close)

    return (
        <div className={s.themeContainer}>
            <div className={s.title}>{label} :</div>
            <div
                className={s.swatch}
                style={{ backgroundColor: color }}
                onClick={() => toggle(true)}
            />

            {isOpen && (
                <div className={s.popup} ref={popup}>
                    <HexColorPicker color={color} onChange={setColor} />
                </div>
            )}
        </div>
    )
}
