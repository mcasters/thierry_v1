import { Item } from '@/interfaces';
import { TYPE } from '@/constants';
import MultipleItemImagesForm from '@/components/admin/form/imageForm/MultipleItemImagesForm';
import SingleItemImageForm from '@/components/admin/form/imageForm/SingleItemImageForm';

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
        <SingleItemImageForm
          item={item}
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
