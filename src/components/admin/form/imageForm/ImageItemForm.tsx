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

export default function ImageItemForm({
  item,
  type,
  setHasImage,
  reset,
}: Props) {
  return (
    <>
      {type === TYPE.PAINTING && (
        <SingleImageForm item={item} setHasImage={setHasImage} reset={reset} />
      )}
      {type === TYPE.SCULPTURE && (
        <MultipleImagesForm
          item={item}
          setHasImage={setHasImage}
          reset={reset}
          pathImage="/images/type/"
        />
      )}
    </>
  );
}
