"use client";

import React, { useActionState, useEffect, useState } from "react";
import s from "@/styles/admin/Admin.module.css";
import { useAlert } from "@/app/context/AlertProvider";
import { updateMeta } from "@/app/actions/meta/admin";
import { ItemLayout, Type } from "@/lib/type";
import Image from "next/image";

type Props = {
  layout: ItemLayout;
  type: Type.PAINTING | Type.SCULPTURE | Type.DRAWING;
};

export default function ItemLayoutForm({ layout, type }: Props) {
  const [value, setValue] = useState<string>(layout.toString());
  const alert = useAlert();
  const [state, action] = useActionState(updateMeta, null);

  console.log(type);
  useEffect(() => {
    if (state) {
      alert(state.message, state.isError);
    }
  }, [state]);

  return (
    <div className={s.container}>
      <h2 className={s.title2}>Mise en page</h2>
      <form action={action}>
        <input
          type="hidden"
          name="label"
          value={
            type === Type.PAINTING
              ? "paintingLayout"
              : type === Type.SCULPTURE
                ? "sculptureLayout"
                : "drawingLayout"
          }
        />
        <input type="hidden" name="text" value={value} />
        {(type === Type.PAINTING || type === Type.DRAWING) && (
          <>
            <label className={s.layoutLabel}>
              <button
                onClick={(e) => setValue(e.currentTarget.value)}
                className={
                  value === "0"
                    ? `${s.buttonLayoutSelected} ${s.buttonLayout}`
                    : s.buttonLayout
                }
                value="0"
              >
                <Image
                  src="/assets/mono-layout.png"
                  alt=""
                  width={200}
                  height={130}
                  unoptimized
                />
              </button>
              <p>
                <strong>{`Une seule image dans la largeur :`}</strong>
                <br />
                {`Les œuvres se suivent, leur description est à côté.`}
              </p>
            </label>
            <label className={s.layoutLabel}>
              <button
                onClick={(e) => setValue(e.currentTarget.value)}
                className={
                  value === "1"
                    ? `${s.buttonLayoutSelected} ${s.buttonLayout}`
                    : s.buttonLayout
                }
                value="1"
              >
                <Image
                  src="/assets/double-layout.png"
                  alt=""
                  width={200}
                  height={130}
                  unoptimized
                />
              </button>
              <p>
                <strong>{`Deux images dans la largeur :`}</strong>
                <br />
                {`Les œuvres sont individualisées, leur description est en
                dessous.`}
              </p>
            </label>
          </>
        )}
        {type === Type.SCULPTURE && (
          <label className={s.layoutLabel}>
            <button
              onClick={(e) => setValue(e.currentTarget.value)}
              className={
                value === "3"
                  ? `${s.buttonLayoutSelected} ${s.buttonLayout}`
                  : s.buttonLayout
              }
              value="3"
            >
              <Image
                src="/assets/sculpture-layout.png"
                alt=""
                width={200}
                height={130}
                unoptimized
              />
            </button>
            <p>
              <strong>{`Images de la sculpture groupées :`}</strong>
              <br />
              {`Les sculptures sont individualisées, leur description est en
              dessous.`}
            </p>
          </label>
        )}
        <label className={s.layoutLabel}>
          <button
            onClick={(e) => setValue(e.currentTarget.value)}
            className={
              value === "2"
                ? `${s.buttonLayoutSelected} ${s.buttonLayout}`
                : s.buttonLayout
            }
            value="2"
          >
            <Image
              src="/assets/gallery-layout.png"
              alt=""
              width={200}
              height={130}
              unoptimized
            />
          </button>
          <p>
            <strong>{`Galerie : toutes les images s'imbriquent :`}</strong>
            <br />
            {`Vision d'ensemble, les œuvres se suivent, leur description apparait
            lorsqu'on pointe la souris, et lorsqu'on ouvre l'image en grand.`}
          </p>
        </label>
      </form>
    </div>
  );
}
