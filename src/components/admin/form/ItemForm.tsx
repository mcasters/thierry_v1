"use client";

import React, { useRef, useState } from "react";
import { parse } from "date-fns";
import toast from "react-hot-toast";
import s from "@/styles/admin/Admin.module.css";
import { SculptureFull } from "@/app/api/sculpture/sculpture";
import { PaintingFull } from "@/app/api/peinture/painting";
import { SculptureCategoryFull } from "@/app/api/sculpture/category/category";
import { PaintingCategoryFull } from "@/app/api/peinture/category/category";
import { isSculptureFull } from "@/utils/commonUtils";
import Images from "@/components/admin/form/imageForm/Images";
import Preview from "@/components/admin/form/imageForm/Preview";
import CancelButton from "@/components/admin/form/CancelButton";
import SubmitButton from "@/components/admin/form/SubmitButton";

interface Props {
  item: SculptureFull | PaintingFull;
  toggleModal?: () => void;
  categories?: PaintingCategoryFull[] | SculptureCategoryFull[];
}

export default function ItemForm({ item, toggleModal, categories }: Props) {
  const isSculpture = isSculptureFull(item);
  const isUpdate = item.id !== 0;
  const formRef = useRef<HTMLFormElement>(null);
  const resetImageRef = useRef<number>(0);

  const [title, setTitle] = useState<string>(item.title);
  const [date, setDate] = useState<Date>(new Date(item.date));
  const [technique, setTechnique] = useState<string>(item.technique);
  const [description, setDescription] = useState<string>(
    item.description || "",
  );
  const [height, setHeight] = useState<string>(item.height.toString());
  const [width, setWidth] = useState<string>(item.width.toString());
  const [price, setPrice] = useState<string>(item.price?.toString() || "");
  const [categoryId, setCategoryId] = useState<string>(
    item.category?.id.toString() || "",
  );
  const [isToSell, setIsToSell] = useState<boolean>(item.isToSell);
  const [length, setLength] = useState<string>(
    isSculpture ? item.length.toString() : "",
  );
  const [countImages, setCountImages] = useState<number>(
    !isUpdate ? 0 : isSculpture ? item.images?.length : 1,
  );
  const api = isUpdate ? `api/${item.type}/update` : `api/${item.type}/add`;

  const reset = () => {
    setTitle("");
    setDate(new Date());
    setTechnique("");
    setDescription("");
    setHeight("");
    setWidth("");
    setLength("");
    setPrice("");
    setIsToSell(false);
    setCategoryId("");
    resetImageRef.current = resetImageRef.current + 1;
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formRef.current && confirm("Tu confirmes ?")) {
      const formData = new FormData(formRef.current);
      fetch(api, { method: "POST", body: formData }).then((res) => {
        if (res.ok) {
          toggleModal ? toggleModal() : reset();
          toast.success(
            isUpdate ? `${item.type} modifiée` : `${item.type} ajoutée`,
          );
          setTimeout(function () {
            window.location.reload();
          }, 1500);
        } else toast.error("Erreur à l'enregistrement");
      });
    }
  };

  const handleAdd = (number: number) => {
    setCountImages((prevState) => prevState + number);
  };

  return (
    <div className={isUpdate ? s.wrapperModal : s.formContainer}>
      <h2>
        {isUpdate ? `Modifier une ${item.type}` : `Ajouter une ${item.type}`}
      </h2>
      <form ref={formRef} onSubmit={submit}>
        {item && <input type="hidden" name="id" value={item.id} />}
        <input type="hidden" name="isToSell" value={String(isToSell)} />
        <label className={s.formLabel}>
          Titre
          <input
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            name="title"
            type="text"
            value={title}
            required
          />
        </label>
        <label className={s.formLabel}>
          Catégorie (facultatif)
          <select
            name="categoryId"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value="">-- Aucune catégorie --</option>
            {categories &&
              categories.map(
                (cat: PaintingCategoryFull | SculptureCategoryFull) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.value}
                  </option>
                ),
              )}
          </select>
        </label>
        <label className={s.formLabel}>
          Année
          <input
            onChange={(e) => {
              const date = parse(e.currentTarget.value, "yyyy", new Date());
              setDate(date);
            }}
            name="date"
            type="number"
            value={date.getFullYear()}
            required
          />
        </label>
        <label className={s.formLabel}>
          Technique
          <input
            onChange={(e) => setTechnique(e.target.value)}
            name="technique"
            type="text"
            value={technique}
            required
          />
        </label>
        <label className={s.formLabel}>
          Description (facultatif)
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            name="description"
            rows={5}
            value={description}
          />
        </label>
        <label className={s.formLabel}>
          Hauteur (cm)
          <input
            onChange={(e) => setHeight(e.target.value)}
            name="height"
            type="number"
            value={height}
            required
          />
        </label>
        <label className={s.formLabel}>
          Largeur (cm)
          <input
            onChange={(e) => setWidth(e.target.value)}
            name="width"
            type="number"
            value={width}
          />
        </label>
        {isSculpture && (
          <label className={s.formLabel}>
            Profondeur (cm)
            <input
              onChange={(e) => setLength(e.target.value)}
              name="length"
              type="number"
              value={length}
              required
            />
          </label>
        )}
        <label className={s.formLabel}>
          À vendre :
          <input
            onChange={(e) => setIsToSell(e.target.checked)}
            name="isToSell"
            type="checkbox"
            defaultChecked={isToSell}
          />
        </label>
        {isToSell && (
          <label className={s.formLabel}>
            Prix
            <input
              onChange={(e) => setPrice(e.target.value)}
              name="price"
              type="text"
              value={price}
            />
          </label>
        )}
        <div className={s.imageFormContainer}>
          {isUpdate && (
            <Preview
              images={isSculpture ? item.images : [item.image]}
              pathImage={`/images/${item.type}`}
              apiForDelete={
                isSculpture && countImages > 1
                  ? `api/${item.type}/delete-image`
                  : undefined
              }
              onDelete={setCountImages}
            />
          )}
          <Images
            onAdd={handleAdd}
            isMultiple={isSculpture}
            title={isSculpture ? "1 photo minimum" : "1 seule photo"}
          />
        </div>
        <div className={s.buttonSection}>
          <SubmitButton
            disabled={
              !title ||
              !date ||
              !technique ||
              !height ||
              !width ||
              (isSculpture && !length) ||
              (isToSell && !price) ||
              countImages === 0
            }
          />
          <CancelButton />
        </div>
      </form>
    </div>
  );
}
