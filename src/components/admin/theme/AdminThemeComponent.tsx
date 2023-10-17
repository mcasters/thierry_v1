'use client'

import { useTheme } from '@/app/context/themeProvider'
import AdminThemeItemComponent from '@/components/admin/theme/AdminThemeItemComponent'

export default function AdminThemeComponent() {
    const theme = useTheme()
    return (
        <>
            <AdminThemeItemComponent
                label="Couleur de fond :"
                color={theme.backgroundColor}
                setColor={theme.setBackgroundColor}
            />
        </>
    )
}
