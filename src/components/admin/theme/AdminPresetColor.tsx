'use client'

import { PresetColor } from '.prisma/client'

import s from './AdminThemeComponent.module.css'
import DeleteButton from '@/components/admin/form/DeleteButton'

interface Props {
    presetColors: PresetColor[]
}

export default function AdminPresetColor({ presetColors }: Props) {
    return (
        <div>
            {presetColors.map((presetColor) => (
                <div className={s.colorContainer} key={presetColor.id}>
                    <p className={s.label}>{presetColor.name}</p>
                    <div
                        className={`${s.swatch} ${s.presetColor}`}
                        style={{ backgroundColor: presetColor.color }}
                    />
                    <DeleteButton
                        api={`admin/api/theme/delete-color/${presetColor.id}`}
                        key={presetColor.id}
                    />
                </div>
            ))}
        </div>
    )
}
