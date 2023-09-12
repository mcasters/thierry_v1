import { Item } from '@/interfaces';
import SingleItemImageForm from '@/components/admin/form/imageForm/SingleItemImageForm';
import { TYPE } from '@/constants';
import MultipleItemImagesForm from '@/components/admin/form/imageForm/MultipleItemImagesForm';
import SingleImageForm from '@/components/admin/form/imageForm/SingleImageForm';

type Props = {
  item?: Item;
  type: string;
  setHasImage: (boolean) => void;
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
        <MultipleItemImagesForm
          item={item}
          setHasImage={setHasImage}
          reset={reset}
        />
      )}
    </>
  );
}
