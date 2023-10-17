'use client'

import { useTheme } from '@/app/context/themeProvider'
import AdminThemeItemComponent from '@/components/admin/theme/AdminThemeItemComponent'
import { useState } from 'react'
import { Theme } from '@prisma/client'

export default function AdminThemeComponent() {
    const theme = useTheme()
    const [themeToUpdate, setThemeToUpdate] = useState<Theme>(theme)

    return (
        <>
            <h1>Gestion du thème</h1>
            <section>
                <h2>Général</h2>
                <AdminThemeItemComponent
                    label="Couleur ligne"
                    color={themeToUpdate.lineColor}
                    setColor={(newColor: string) =>
                        setThemeToUpdate(
                            Object.assign({}, themeToUpdate, {
                                lineColor: newColor,
                            })
                        )
                    }
                />
                <AdminThemeItemComponent
                    label="Couleur de fond"
                    color={themeToUpdate.backgroundColor}
                    setColor={(newColor: string) =>
                        setThemeToUpdate(
                            Object.assign({}, themeToUpdate, {
                                backgroundColor: newColor,
                            })
                        )
                    }
                />
                <AdminThemeItemComponent
                    label="Couleur des liens"
                    color={themeToUpdate.linkColor}
                    setColor={(newColor: string) =>
                        setThemeToUpdate(
                            Object.assign({}, themeToUpdate, {
                                linkColor: newColor,
                            })
                        )
                    }
                />
                <AdminThemeItemComponent
                    label="Couleur des liens hover"
                    color={themeToUpdate.linkHoverColor}
                    setColor={(newColor: string) =>
                        setThemeToUpdate(
                            Object.assign({}, themeToUpdate, {
                                linkHoverColor: newColor,
                            })
                        )
                    }
                />
                <AdminThemeItemComponent
                    label="Couleur du texte"
                    color={themeToUpdate.color}
                    setColor={(newColor: string) =>
                        setThemeToUpdate(
                            Object.assign({}, themeToUpdate, {
                                color: newColor,
                            })
                        )
                    }
                />
            </section>
            <section>
                <h2>Page Home</h2>
                <AdminThemeItemComponent
                    label="Couleur du menu 1"
                    color={themeToUpdate.menu1HomeColor}
                    setColor={(newColor: string) =>
                        setThemeToUpdate(
                            Object.assign({}, themeToUpdate, {
                                menu1HomeColor: newColor,
                            })
                        )
                    }
                />
                <AdminThemeItemComponent
                    label="Couleur du menu 2"
                    color={themeToUpdate.menu2HomeColor}
                    setColor={(newColor: string) =>
                        setThemeToUpdate(
                            Object.assign({}, themeToUpdate, {
                                menu2HomeColor: newColor,
                            })
                        )
                    }
                />
                <AdminThemeItemComponent
                    label="Couleur du texte du menu 1"
                    color={themeToUpdate.menu1LinkHomeColor}
                    setColor={(newColor: string) =>
                        setThemeToUpdate(
                            Object.assign({}, themeToUpdate, {
                                menu1LinkHomeColor: newColor,
                            })
                        )
                    }
                />
                <AdminThemeItemComponent
                    label="Couleur du texte hover du menu 1"
                    color={themeToUpdate.menu1LinkHomeHoverColor}
                    setColor={(newColor: string) =>
                        setThemeToUpdate(
                            Object.assign({}, themeToUpdate, {
                                menu1LinkHomeHoverColor: newColor,
                            })
                        )
                    }
                />
                <AdminThemeItemComponent
                    label="Couleur du texte du menu 2"
                    color={themeToUpdate.menu2LinkHomeColor}
                    setColor={(newColor: string) =>
                        setThemeToUpdate(
                            Object.assign({}, themeToUpdate, {
                                menu2LinkHomeColor: newColor,
                            })
                        )
                    }
                />
                <AdminThemeItemComponent
                    label="Couleur du texte hover du menu 2"
                    color={themeToUpdate.menu2LinkHomeHoverColor}
                    setColor={(newColor: string) =>
                        setThemeToUpdate(
                            Object.assign({}, themeToUpdate, {
                                menu2LinkHomeHoverColor: newColor,
                            })
                        )
                    }
                />
            </section>
            <section>
                <h2>Pages des œuvres</h2>
                <AdminThemeItemComponent
                    label="Couleur de fond"
                    color={themeToUpdate.backgroundColorItem}
                    setColor={(newColor: string) =>
                        setThemeToUpdate(
                            Object.assign({}, themeToUpdate, {
                                backgroundColorItem: newColor,
                            })
                        )
                    }
                />
                <AdminThemeItemComponent
                    label="Couleur du texte"
                    color={themeToUpdate.colorItem}
                    setColor={(newColor: string) =>
                        setThemeToUpdate(
                            Object.assign({}, themeToUpdate, {
                                colorItem: newColor,
                            })
                        )
                    }
                />
                <AdminThemeItemComponent
                    label="Couleur des liens"
                    color={themeToUpdate.linkItemColor}
                    setColor={(newColor: string) =>
                        setThemeToUpdate(
                            Object.assign({}, themeToUpdate, {
                                linkItemColor: newColor,
                            })
                        )
                    }
                />
                <AdminThemeItemComponent
                    label="Couleur des liens hover"
                    color={themeToUpdate.linkHoverItemColor}
                    setColor={(newColor: string) =>
                        setThemeToUpdate(
                            Object.assign({}, themeToUpdate, {
                                linkHoverItemColor: newColor,
                            })
                        )
                    }
                />
                <AdminThemeItemComponent
                    label="Couleur du menu 1"
                    color={themeToUpdate.menu1ItemColor}
                    setColor={(newColor: string) =>
                        setThemeToUpdate(
                            Object.assign({}, themeToUpdate, {
                                menu1ItemColor: newColor,
                            })
                        )
                    }
                />
                <AdminThemeItemComponent
                    label="Couleur du menu 2"
                    color={themeToUpdate.menu2ItemColor}
                    setColor={(newColor: string) =>
                        setThemeToUpdate(
                            Object.assign({}, themeToUpdate, {
                                menu2ItemColor: newColor,
                            })
                        )
                    }
                />
                <AdminThemeItemComponent
                    label="Couleur du texte du menu 1"
                    color={themeToUpdate.menu1LinkItemColor}
                    setColor={(newColor: string) =>
                        setThemeToUpdate(
                            Object.assign({}, themeToUpdate, {
                                menu1LinkItemColor: newColor,
                            })
                        )
                    }
                />
                <AdminThemeItemComponent
                    label="Couleur du texte hover du menu 1"
                    color={themeToUpdate.menu1LinkHoverItemColor}
                    setColor={(newColor: string) =>
                        setThemeToUpdate(
                            Object.assign({}, themeToUpdate, {
                                menu1LinkHoverItemColor: newColor,
                            })
                        )
                    }
                />
                <AdminThemeItemComponent
                    label="Couleur du texte du menu 2"
                    color={themeToUpdate.menu2LinkItemColor}
                    setColor={(newColor: string) =>
                        setThemeToUpdate(
                            Object.assign({}, themeToUpdate, {
                                menu2LinkItemColor: newColor,
                            })
                        )
                    }
                />
                <AdminThemeItemComponent
                    label="Couleur du texte hover du menu 2"
                    color={themeToUpdate.menu2LinkHoverItemColor}
                    setColor={(newColor: string) =>
                        setThemeToUpdate(
                            Object.assign({}, themeToUpdate, {
                                menu2LinkHoverItemColor: newColor,
                            })
                        )
                    }
                />
            </section>
            <section>
                <h2>Autres pages</h2>
                <AdminThemeItemComponent
                    label="Couleur du menu 1"
                    color={themeToUpdate.menu1Color}
                    setColor={(newColor: string) =>
                        setThemeToUpdate(
                            Object.assign({}, themeToUpdate, {
                                menu1Color: newColor,
                            })
                        )
                    }
                />
                <AdminThemeItemComponent
                    label="Couleur du menu 2"
                    color={themeToUpdate.menu2Color}
                    setColor={(newColor: string) =>
                        setThemeToUpdate(
                            Object.assign({}, themeToUpdate, {
                                menu2Color: newColor,
                            })
                        )
                    }
                />
                <AdminThemeItemComponent
                    label="Couleur du texte du menu 1"
                    color={themeToUpdate.menu1LinkColor}
                    setColor={(newColor: string) =>
                        setThemeToUpdate(
                            Object.assign({}, themeToUpdate, {
                                menu1LinkColor: newColor,
                            })
                        )
                    }
                />
                <AdminThemeItemComponent
                    label="Couleur du texte hover du menu 1"
                    color={themeToUpdate.menu1LinkHoverColor}
                    setColor={(newColor: string) =>
                        setThemeToUpdate(
                            Object.assign({}, themeToUpdate, {
                                menu1LinkHoverColor: newColor,
                            })
                        )
                    }
                />
                <AdminThemeItemComponent
                    label="Couleur du texte du menu 2"
                    color={themeToUpdate.menu2LinkColor}
                    setColor={(newColor: string) =>
                        setThemeToUpdate(
                            Object.assign({}, themeToUpdate, {
                                menu2LinkColor: newColor,
                            })
                        )
                    }
                />
                <AdminThemeItemComponent
                    label="Couleur du texte hover du menu 2"
                    color={themeToUpdate.menu2LinkHoverColor}
                    setColor={(newColor: string) =>
                        setThemeToUpdate(
                            Object.assign({}, themeToUpdate, {
                                menu2LinkHoverColor: newColor,
                            })
                        )
                    }
                />
            </section>
        </>
    )
}
