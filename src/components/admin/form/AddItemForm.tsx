import React, { useRef, useState } from 'react';

import { Item } from '@/interfaces';
import { TYPE } from '@/constants';
import DayPickerComponent from '@/components/admin/form/daypicker/DayPickerComponent';
import ImageItemForm from '@/components/admin/form/imageForm/ImageItemForm';
import s from './form.module.css';
import toast from 'react-hot-toast';
import { useSWRConfig } from 'swr';

interface Props {
  item?: Item;
  type: string;
  toggleModal?: () => void;
}

export default function AddItemForm({ item, type, toggleModal }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const resetImageRef = useRef<number>(0);
  const { mutate } = useSWRConfig();

  const [title, setTitle] = useState<string>(item?.title || '');
  const [date, setDate] = useState<Date>(
    item?.date ? new Date(item.date) : new Date(),
  );
  const [technique, setTechnique] = useState<string>(item?.technique || '');
  const [description, setDescription] = useState<string>(
    item?.description || '',
  );
  const [height, setHeight] = useState<string>(item?.height.toString() || '');
  const [width, setWidth] = useState<string>(item?.width.toString() || '');
  const [length, setLength] = useState<string>(item?.length?.toString() || '');
  const [price, setPrice] = useState<string>(item?.price?.toString() || '');
  const [isToSell, setIsToSell] = useState<boolean>(item?.isToSell || false);

  const [hasImage, setHasImage] = useState<boolean>(false);

  const api = item ? `/api/${type}/update` : `/api/${type}/add`;
  const apiToUpdate = `/api/${type}`;

  const handleDayChange = (date: any) => {
    setDate(date);
  };

  const reset = () => {
    setTitle('');
    setDate(new Date());
    setTechnique('');
    setDescription('');
    setHeight('');
    setWidth('');
    setLength('');
    setPrice('');
    setIsToSell(false);
    resetImageRef.current = resetImageRef.current + 1;
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formRef.current && confirm('Tu confirmes ?')) {
      const formData = new FormData(formRef.current);
      fetch(api, { method: 'POST', body: formData }).then((res) => {
        if (res.ok) {
          toast(item ? `${type} modifiée` : `${type} ajoutée`);
          toggleModal ? toggleModal() : reset();
          mutate(apiToUpdate);
        } else toast("Erreur à l'enregistrement");
      });
    }
  };

  return (
    <div className={s.formContainer}>
      <h2>{item ? `Modifier une ${item.type}` : `Ajouter une ${type}`}</h2>
      <form ref={formRef} onSubmit={submit}>
        {item && <input type="hidden" name="id" value={item.id} />}
        <input type="hidden" name="isToSell" value={String(isToSell)} />
        <input
          autoFocus
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Titre"
          name="title"
          type="text"
          value={title}
          required
        />
        <DayPickerComponent
          handleDayChange={handleDayChange}
          alreadyDay={date}
          fieldName="date"
        />
        <input
          onChange={(e) => setTechnique(e.target.value)}
          placeholder="Technique"
          name="technique"
          type="text"
          value={technique}
          required
        />
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description (facultatif)"
          name="description"
          rows={5}
          value={description}
        />
        <input
          onChange={(e) => setHeight(e.target.value)}
          placeholder="Hauteur"
          name="height"
          type="number"
          value={height}
          required
        />
        <input
          onChange={(e) => setWidth(e.target.value)}
          placeholder="Largeur"
          name="width"
          type="number"
          value={width}
        />
        {type === TYPE.SCULPTURE && (
          <input
            onChange={(e) => setLength(e.target.value)}
            placeholder="Profondeur"
            name="length"
            type="number"
            value={length}
            required
          />
        )}
        <label>
          À vendre :
          <input
            onChange={(e) => setIsToSell(e.target.checked)}
            name="isToSell"
            type="checkbox"
            defaultChecked={isToSell}
          />
        </label>
        {isToSell && (
          <input
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Prix"
            name="price"
            type="text"
            value={price}
          />
        )}
        <ImageItemForm
          item={item ? item : undefined}
          type={type}
          setHasImage={setHasImage}
          reset={resetImageRef.current}
        />
        <div>
          <div className="separate"></div>
          <input
            disabled={
              !title ||
              !date ||
              !technique ||
              !height ||
              !width ||
              (type === TYPE.SCULPTURE && !length) ||
              (isToSell && !price) ||
              !hasImage
            }
            type="submit"
            value="Enregistrer"
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleModal ? toggleModal() : reset();
            }}
            className="adminButton"
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
}
