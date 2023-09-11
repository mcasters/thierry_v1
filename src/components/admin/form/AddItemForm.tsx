import React, { useRef, useState } from 'react';

import { Item } from '@/interfaces';
import { TYPE } from '@/constants';
import DayPickerComponent from '@/components/admin/form/daypicker/DayPickerComponent';
import ImageForm from '@/components/admin/form/imageForm/ImageForm';
import s from './form.module.css';
import toast from 'react-hot-toast';

interface Props {
  item?: Item;
  type: string;
}
export default function AddItemForm({ item, type }: Props) {
  const formRef = useRef<HTMLFormElement>();
  const [title, setTitle] = useState<string>(item?.title || '');
  const [date, setDate] = useState<Date>(
    item?.date ? new Date(item.date) : new Date(),
  );
  const [technique, setTechnique] = useState<string>(item?.technique || '');
  const [description, setDescription] = useState<string>(
    item?.description || '',
  );
  const [height, setHeight] = useState<number>(item?.height || null);
  const [width, setWidth] = useState<number>(item?.width || null);
  const [length, setLength] = useState<number>(item?.length || null);
  const [price, setPrice] = useState<number>(item?.price || null);
  const [isToSell, setIsToSell] = useState<boolean>(item?.isToSell || false);
  const [hasImage, setHasImage] = useState<boolean>(false);
  const api = `/api/${type}/add`;

  const handleDayChange = (date: any) => {
    setDate(date);
  };

  const reset = () => {
    setTitle('');
    setDate(new Date());
    setTechnique('');
    setDescription('');
    setHeight(null);
    setWidth(null);
    setLength(null);
    setPrice(null);
    setIsToSell(false);
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    if (formRef.current && confirm('Tu confirmes ?')) {
      const formData = new FormData(formRef.current);
      fetch(api, { method: 'POST', body: formData }).then((res) => {
        console.log(res);
        if (res.ok) {
          console.log('// IN');
          toast(`${type} ajoutée`);
        } else toast("Erreur à l'enregistrement");
      });
    }
  };

  return (
    <form ref={formRef} className={s.form} onSubmit={submit}>
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
          onChange={(e) => setIsToSell(e.target.checked)}
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
      <ImageForm
        item={item ? item : null}
        type={type}
        setHasImage={setHasImage}
      />
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
            (isToSell && !price) ||
            !hasImage
          }
          type="submit"
          value="Enregistrer"
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            reset();
          }}
          className="adminButton"
        >
          Annuler
        </button>
      </div>
    </form>
  );
}
