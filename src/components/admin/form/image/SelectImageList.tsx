"use client";

import React, { useState } from "react";
import s from "@/components/admin/admin.module.css";
import Image from "next/image";
import { Image as IImage, ItemFull } from "@/lib/type";
import { getEmptyImage } from "@/utils/commonUtils";
import { useTheme } from "@/app/context/themeProvider";

type Props = {
  items: ItemFull[];
  value: IImage;
  onChange: (image: IImage) => void;
};

export default function SelectImageList({ items, value, onChange }: Props) {
  const theme = useTheme();
  const [selectedColor, setSelectedColor] = React.useState(
    theme.other.main.link,
  );
  const [filenameSelected, setFilenameSelected] = useState<string>(
    value.filename,
  );

  const onSelectImage = (image: IImage) => {
    setFilenameSelected(image.filename);
    onChange(image);
  };

  return (
    <>
      <label className={s.formLabel}>Image de la catégorie (facultative)</label>
      <div className={s.selectList}>
        <div
          onClick={() => onSelectImage(getEmptyImage())}
          className={s.option}
          onMouseEnter={() =>
            filenameSelected === ""
              ? setSelectedColor(theme.other.main.linkHover)
              : ""
          }
          onMouseLeave={() =>
            filenameSelected === ""
              ? setSelectedColor(theme.other.main.link)
              : ""
          }
          style={
            filenameSelected === "" ? { background: `${selectedColor}` } : {}
          }
        >
          -- Aucune image --
        </div>
        {items.length > 0 &&
          items.map((item: ItemFull) => {
            return item.images.map((image: IImage) => {
              const isSelected = image.filename === filenameSelected;
              return (
                <div
                  key={`${item.id}-${image.id}`}
                  className={s.option}
                  onClick={() => onSelectImage(image)}
                  onMouseEnter={() =>
                    isSelected
                      ? setSelectedColor(theme.other.main.linkHover)
                      : ""
                  }
                  onMouseLeave={() =>
                    isSelected ? setSelectedColor(theme.other.main.link) : ""
                  }
                  style={isSelected ? { background: `${selectedColor}` } : {}}
                >
                  <Image
                    src={`/images/${item.type}/sm/${image.filename}`}
                    width={120}
                    height={120}
                    alt="Image de l'item"
                    style={{
                      objectFit: "cover",
                    }}
                    unoptimized
                  />
                </div>
              );
            });
          })}
      </div>
      Les images sont ici tronquées au carré, comme elles sont affichées dans la
      pastille de la catégorie.
    </>
  );
}
