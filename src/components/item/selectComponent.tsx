"use client";

import { CategoryFull, Type } from "@/lib/type";
import React, { useState } from "react";
import s from "./ItemComponent.module.css";
import Image from "next/image";

interface Props {
  type: Type;
  categories: CategoryFull[];
  onCategoryChange: (categoryKey: string) => void;
  years: number[];
  onYearChange: (year: number) => void;
  isSmall: boolean;
}
export default function SelectComponent({
  type,
  categories,
  onCategoryChange,
  years,
  onYearChange,
  isSmall,
}: Props) {
  const [selectedCategoryKey, setSelectedCategoryKey] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<number>(0);

  const changeCategory = (key: string) => {
    onCategoryChange(key);
    setSelectedCategoryKey(key);
    setSelectedYear(0);
  };

  const changeYear = (year: number) => {
    onYearChange(year);
    setSelectedYear(year);
    setSelectedCategoryKey("");
  };

  return (
    <>
      <ul className={s.ul}>
        <li>
          <button
            onClick={() => changeCategory("")}
            className={`${s.categoryButton} ${s.noImage} ${selectedCategoryKey === "" ? s.isSelected : ""}`}
          >
            Toutes catégories
          </button>
        </li>
        {categories.map((category) => {
          const noCategory = category.key === "no-category";
          return (
            <li key={category.key}>
              <button
                onClick={() => changeCategory(category.key)}
                className={`${s.categoryButton} ${noCategory ? s.noImage : ""} ${selectedCategoryKey === category.key ? s.isSelected : ""}`}
              >
                {!isSmall && category.content.image.filename !== "" && (
                  <Image
                    src={`/images/${type}/sm/${category.content.image.filename}`}
                    fill
                    alt=""
                    style={{
                      objectFit: "cover",
                    }}
                    priority
                    unoptimized
                    className={s.image}
                  />
                )}
                {isSmall || noCategory ? (
                  category.value
                ) : (
                  <p>{category.value}</p>
                )}
              </button>
            </li>
          );
        })}
      </ul>
      <select
        className={s.yearSelect}
        name="year"
        value={selectedYear.toString()}
        onChange={(e) => changeYear(Number(e.target.value))}
      >
        <option value="">-- Année --</option>
        {years &&
          years.map((year) => (
            <option key={year} value={year.toString()}>
              {year.toString()}
            </option>
          ))}
      </select>
    </>
  );
}
