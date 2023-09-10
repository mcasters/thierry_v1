import React, { MutableRefObject, useState } from 'react';

import { Item } from '@/interfaces';
import { TYPE } from '@/constants';
import DayPickerComponent from '@/components/admin/form/daypicker/DayPickerComponent';
import ImageForm from '@/components/admin/form/imageForm/ImageForm';
import s from './form.module.css';

interface Props {
  formRef: MutableRefObject<HTMLFormElement>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  item?: Item;
  type: string;
}
export default function HorseForm({ formRef, onSubmit, item, type }: Props) {
  const [title, setTitle] = useState<string>(item?.title || '');
  const [date, setDate] = useState<Date>(
    item?.date ? new Date(item.date) : new Date(),
  );
  const [technique, setTechnique] = useState<string>(item?.technique || '');
  const [description, setDescription] = useState<string>(
    item?.description || '',
  );
  const [height, setHeight] = useState<number | undefined>(
    item?.height || undefined,
  );
  const [width, setWidth] = useState<number | undefined>(
    item?.width || undefined,
  );
  const [length, setLength] = useState<number | undefined>(
    item?.length || undefined,
  );
  const [price, setPrice] = useState<number | undefined>(
    item?.price || undefined,
  );
  const [isToSell, setIsToSell] = useState<boolean>(item?.isToSell || false);

  const handleDayChange = (date: any) => {
    setDate(date);
  };

  return (
    <form ref={formRef} className={s.form} onSubmit={onSubmit}>
      <h2>{item ? `Modifier une ${item.type}` : `Ajouter une ${type}`}</h2>
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
        onChange={(e) => setHeight(parseInt(e.target.value))}
        placeholder="Hauteur"
        name="height"
        type="number"
        value={height}
        required
      />
      <input
        onChange={(e) => setWidth(parseInt(e.target.value))}
        placeholder="Largeur"
        name="width"
        type="number"
        value={width}
      />
      {type === TYPE.SCULPTURE && (
        <input
          onChange={(e) => setLength(parseInt(e.target.value))}
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
          onChange={() => setIsToSell(!isToSell)}
          name="isToSell"
          type="checkbox"
          defaultChecked={isToSell}
        />
      </label>
      {isToSell && (
        <input
          onChange={(e) => setPrice(parseInt(e.target.value))}
          placeholder="Prix"
          name="price"
          type="text"
          value={price}
        />
      )}
      <ImageForm item={item ? item : null} type={type} />
      <div>
        <div className={s.separate}></div>
        <input
          disabled={
            !title ||
            !date ||
            !technique ||
            !height ||
            !width ||
            (type === TYPE.SCULPTURE && !length) ||
            (isToSell && !price)
          }
          type="submit"
          value="Enregistrer"
        />
        <input type="reset" />
      </div>
    </form>
  );
}
