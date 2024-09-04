"use client";

import AdminColor from "@/components/admin/theme/AdminColor";
import { useState } from "react";
import s from "./AdminThemeComponent.module.css";
import { ThemeFull } from "@/app/api/theme/theme";
import toast from "react-hot-toast";
import AdminPresetColor from "@/components/admin/theme/AdminPresetColor";

interface Props {
  theme: ThemeFull;
}

export default function AdminThemeComponent({ theme }: Props) {
  const [themeToUpdate, setThemeToUpdate] = useState<ThemeFull>(theme);

  const submit = () => {
    fetch("admin/api/theme/update", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ themeToUpdate }),
    }).then((res) => {
      if (res.ok) {
        toast("Thème enregistré");
        window.location.reload();
      } else toast("Erreur à l'enregistrement");
    });
  };

  const reset = () => {
    fetch("admin/api/theme/reset", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        toast("Thème par défaut en place");
        window.location.reload();
      } else toast("Erreur à la mise en place du thème par défaut");
    });
  };

  return (
    <>
      <h1>Gestion du thème</h1>
      <div className={s.themeContainer}>
        <div className={s.grid}>
          <section>
            <h2 className={s.subTitle}>Général</h2>
            <AdminColor
              label="Couleur de la ligne au top"
              color={themeToUpdate.lineColor}
              setColor={(newColor: string) =>
                setThemeToUpdate(
                  Object.assign({}, themeToUpdate, {
                    lineColor: newColor,
                  }),
                )
              }
              themeId={themeToUpdate.id}
              presetColors={themeToUpdate.presetColors}
            />
            <AdminColor
              label="Couleur de fond"
              color={themeToUpdate.backgroundColor}
              setColor={(newColor: string) =>
                setThemeToUpdate(
                  Object.assign({}, themeToUpdate, {
                    backgroundColor: newColor,
                  }),
                )
              }
              themeId={themeToUpdate.id}
              presetColors={themeToUpdate.presetColors}
            />
            <AdminColor
              label="Couleur du texte"
              color={themeToUpdate.color}
              setColor={(newColor: string) =>
                setThemeToUpdate(
                  Object.assign({}, themeToUpdate, {
                    color: newColor,
                  }),
                )
              }
              themeId={themeToUpdate.id}
              presetColors={themeToUpdate.presetColors}
            />
            <AdminColor
              label="Couleur des liens"
              color={themeToUpdate.linkColor}
              setColor={(newColor: string) =>
                setThemeToUpdate(
                  Object.assign({}, themeToUpdate, {
                    linkColor: newColor,
                  }),
                )
              }
              themeId={themeToUpdate.id}
              presetColors={themeToUpdate.presetColors}
            />
            <AdminColor
              label="Couleur des liens hover"
              color={themeToUpdate.linkHoverColor}
              setColor={(newColor: string) =>
                setThemeToUpdate(
                  Object.assign({}, themeToUpdate, {
                    linkHoverColor: newColor,
                  }),
                )
              }
              themeId={themeToUpdate.id}
              presetColors={themeToUpdate.presetColors}
            />
          </section>
          <section>
            <h2 className={s.subTitle}>Page Home</h2>
            <AdminColor
              label="Couleur du menu 1"
              color={themeToUpdate.menu1HomeColor}
              setColor={(newColor: string) =>
                setThemeToUpdate(
                  Object.assign({}, themeToUpdate, {
                    menu1HomeColor: newColor,
                  }),
                )
              }
              themeId={themeToUpdate.id}
              presetColors={themeToUpdate.presetColors}
            />
            <AdminColor
              label="Couleur du menu 2"
              color={themeToUpdate.menu2HomeColor}
              setColor={(newColor: string) =>
                setThemeToUpdate(
                  Object.assign({}, themeToUpdate, {
                    menu2HomeColor: newColor,
                  }),
                )
              }
              themeId={themeToUpdate.id}
              presetColors={themeToUpdate.presetColors}
            />
            <AdminColor
              label="Couleur du texte du menu 1"
              color={themeToUpdate.menu1LinkHomeColor}
              setColor={(newColor: string) =>
                setThemeToUpdate(
                  Object.assign({}, themeToUpdate, {
                    menu1LinkHomeColor: newColor,
                  }),
                )
              }
              themeId={themeToUpdate.id}
              presetColors={themeToUpdate.presetColors}
            />
            <AdminColor
              label="Couleur du texte hover du menu 1"
              color={themeToUpdate.menu1LinkHomeHoverColor}
              setColor={(newColor: string) =>
                setThemeToUpdate(
                  Object.assign({}, themeToUpdate, {
                    menu1LinkHomeHoverColor: newColor,
                  }),
                )
              }
              themeId={themeToUpdate.id}
              presetColors={themeToUpdate.presetColors}
            />
            <AdminColor
              label="Couleur du texte du menu 2"
              color={themeToUpdate.menu2LinkHomeColor}
              setColor={(newColor: string) =>
                setThemeToUpdate(
                  Object.assign({}, themeToUpdate, {
                    menu2LinkHomeColor: newColor,
                  }),
                )
              }
              themeId={themeToUpdate.id}
              presetColors={themeToUpdate.presetColors}
            />
            <AdminColor
              label="Couleur du texte hover du menu 2"
              color={themeToUpdate.menu2LinkHomeHoverColor}
              setColor={(newColor: string) =>
                setThemeToUpdate(
                  Object.assign({}, themeToUpdate, {
                    menu2LinkHomeHoverColor: newColor,
                  }),
                )
              }
              themeId={themeToUpdate.id}
              presetColors={themeToUpdate.presetColors}
            />
          </section>
          <section>
            <h2 className={s.subTitle}>Autres pages</h2>
            <AdminColor
              label="Couleur du menu 1"
              color={themeToUpdate.menu1Color}
              setColor={(newColor: string) =>
                setThemeToUpdate(
                  Object.assign({}, themeToUpdate, {
                    menu1Color: newColor,
                  }),
                )
              }
              themeId={themeToUpdate.id}
              presetColors={themeToUpdate.presetColors}
            />
            <AdminColor
              label="Couleur du menu 2"
              color={themeToUpdate.menu2Color}
              setColor={(newColor: string) =>
                setThemeToUpdate(
                  Object.assign({}, themeToUpdate, {
                    menu2Color: newColor,
                  }),
                )
              }
              themeId={themeToUpdate.id}
              presetColors={themeToUpdate.presetColors}
            />
            <AdminColor
              label="Couleur du texte du menu 1"
              color={themeToUpdate.menu1LinkColor}
              setColor={(newColor: string) =>
                setThemeToUpdate(
                  Object.assign({}, themeToUpdate, {
                    menu1LinkColor: newColor,
                  }),
                )
              }
              themeId={themeToUpdate.id}
              presetColors={themeToUpdate.presetColors}
            />
            <AdminColor
              label="Couleur du texte hover du menu 1"
              color={themeToUpdate.menu1LinkHoverColor}
              setColor={(newColor: string) =>
                setThemeToUpdate(
                  Object.assign({}, themeToUpdate, {
                    menu1LinkHoverColor: newColor,
                  }),
                )
              }
              themeId={themeToUpdate.id}
              presetColors={themeToUpdate.presetColors}
            />
            <AdminColor
              label="Couleur du texte du menu 2"
              color={themeToUpdate.menu2LinkColor}
              setColor={(newColor: string) =>
                setThemeToUpdate(
                  Object.assign({}, themeToUpdate, {
                    menu2LinkColor: newColor,
                  }),
                )
              }
              themeId={themeToUpdate.id}
              presetColors={themeToUpdate.presetColors}
            />
            <AdminColor
              label="Couleur du texte hover du menu 2"
              color={themeToUpdate.menu2LinkHoverColor}
              setColor={(newColor: string) =>
                setThemeToUpdate(
                  Object.assign({}, themeToUpdate, {
                    menu2LinkHoverColor: newColor,
                  }),
                )
              }
              themeId={themeToUpdate.id}
              presetColors={themeToUpdate.presetColors}
            />
          </section>
          <section>
            <h2 className={s.subTitle}>Pages des œuvres</h2>
            <AdminColor
              label="Couleur de fond"
              color={themeToUpdate.backgroundColorItem}
              setColor={(newColor: string) =>
                setThemeToUpdate(
                  Object.assign({}, themeToUpdate, {
                    backgroundColorItem: newColor,
                  }),
                )
              }
              themeId={themeToUpdate.id}
              presetColors={themeToUpdate.presetColors}
            />
            <AdminColor
              label="Couleur du texte"
              color={themeToUpdate.colorItem}
              setColor={(newColor: string) =>
                setThemeToUpdate(
                  Object.assign({}, themeToUpdate, {
                    colorItem: newColor,
                  }),
                )
              }
              themeId={themeToUpdate.id}
              presetColors={themeToUpdate.presetColors}
            />
            <AdminColor
              label="Couleur des liens"
              color={themeToUpdate.linkItemColor}
              setColor={(newColor: string) =>
                setThemeToUpdate(
                  Object.assign({}, themeToUpdate, {
                    linkItemColor: newColor,
                  }),
                )
              }
              themeId={themeToUpdate.id}
              presetColors={themeToUpdate.presetColors}
            />
            <AdminColor
              label="Couleur des liens hover"
              color={themeToUpdate.linkHoverItemColor}
              setColor={(newColor: string) =>
                setThemeToUpdate(
                  Object.assign({}, themeToUpdate, {
                    linkHoverItemColor: newColor,
                  }),
                )
              }
              themeId={themeToUpdate.id}
              presetColors={themeToUpdate.presetColors}
            />
            <AdminColor
              label="Couleur du menu 1"
              color={themeToUpdate.menu1ItemColor}
              setColor={(newColor: string) =>
                setThemeToUpdate(
                  Object.assign({}, themeToUpdate, {
                    menu1ItemColor: newColor,
                  }),
                )
              }
              themeId={themeToUpdate.id}
              presetColors={themeToUpdate.presetColors}
            />
            <AdminColor
              label="Couleur du menu 2"
              color={themeToUpdate.menu2ItemColor}
              setColor={(newColor: string) =>
                setThemeToUpdate(
                  Object.assign({}, themeToUpdate, {
                    menu2ItemColor: newColor,
                  }),
                )
              }
              themeId={themeToUpdate.id}
              presetColors={themeToUpdate.presetColors}
            />
            <AdminColor
              label="Couleur du texte du menu 1"
              color={themeToUpdate.menu1LinkItemColor}
              setColor={(newColor: string) =>
                setThemeToUpdate(
                  Object.assign({}, themeToUpdate, {
                    menu1LinkItemColor: newColor,
                  }),
                )
              }
              themeId={themeToUpdate.id}
              presetColors={themeToUpdate.presetColors}
            />
            <AdminColor
              label="Couleur du texte hover du menu 1"
              color={themeToUpdate.menu1LinkHoverItemColor}
              setColor={(newColor: string) =>
                setThemeToUpdate(
                  Object.assign({}, themeToUpdate, {
                    menu1LinkHoverItemColor: newColor,
                  }),
                )
              }
              themeId={themeToUpdate.id}
              presetColors={themeToUpdate.presetColors}
            />
            <AdminColor
              label="Couleur du texte du menu 2"
              color={themeToUpdate.menu2LinkItemColor}
              setColor={(newColor: string) =>
                setThemeToUpdate(
                  Object.assign({}, themeToUpdate, {
                    menu2LinkItemColor: newColor,
                  }),
                )
              }
              themeId={themeToUpdate.id}
              presetColors={themeToUpdate.presetColors}
            />
            <AdminColor
              label="Couleur du texte hover du menu 2"
              color={themeToUpdate.menu2LinkHoverItemColor}
              setColor={(newColor: string) =>
                setThemeToUpdate(
                  Object.assign({}, themeToUpdate, {
                    menu2LinkHoverItemColor: newColor,
                  }),
                )
              }
              themeId={themeToUpdate.id}
              presetColors={themeToUpdate.presetColors}
            />
          </section>
        </div>
        <div>
          <p>
            Les couleur changées ne sont enregistrées qu'en ayant validé sur
            "Valider le thème".
          </p>
          <br />
          <p>
            Les couleur mémorisées (celle auxquelles tu donnes un nom), même si
            elles ont été enregistrées lors de leur création, n'apparaitrons
            dans la liste de couleurs mémorisées qu'une fois le thème validé
            (c'est un bug d'affichage).
          </p>
          <br />
        </div>
        <button type="submit" onClick={submit} className="adminButton">
          Valider le thème
        </button>
        <button onClick={reset} className="adminButton">
          Thème par défaut
        </button>
        <button
          onClick={(e) => {
            window.location.reload();
          }}
          className="adminButton"
        >
          Annuler
        </button>
      </div>
      <div className={s.themeContainer}>
        <div className={s.grid}>
          <section>
            <h2 className={s.subTitle}>Couleurs mémorisées</h2>
            <AdminPresetColor presetColors={themeToUpdate.presetColors} />
          </section>
        </div>
      </div>
    </>
  );
}
