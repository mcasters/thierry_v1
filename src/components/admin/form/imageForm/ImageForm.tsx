import { Item } from '@/interfaces';
import { TYPE } from '@/constants';
import MultipleImagesForm from '@/components/admin/form/imageForm/MultipleImagesForm';
import SingleImageForm from '@/components/admin/form/imageForm/SingleImageForm';

type Props = {
  item?: Item;
  type: string;
  setHasImage: (arg0: boolean) => void;
  reset: number;
};

export default function ImageForm({ item, type, setHasImage, reset }: Props) {
  let existantImageSrc = undefined;
  if (item && type === TYPE.PAINTING)
    existantImageSrc = `/images/${type}/${item?.image.filename}`;

  return (
    <>
      {type === TYPE.PAINTING && (
        <SingleImageForm
          existantImageSrc={existantImageSrc}
          setHasImage={setHasImage}
          reset={reset}
        />
      )}
      {type === TYPE.SCULPTURE && (
        <MultipleImagesForm
          item={item}
          setHasImage={setHasImage}
          reset={reset}
        />
      )}
    </>
  );
}
