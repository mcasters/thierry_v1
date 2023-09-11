import { Item } from '@/interfaces';
import SingleImageForm from '@/components/admin/form/imageForm/SingleImageForm';
import { TYPE } from '@/constants';
import MultipleImagesForm from '@/components/admin/form/imageForm/MultipleImagesForm';

type Props = {
  item: Item | null;
  type: string;
  setHasImage: (boolean) => void;
  reset: number;
};

export default function ImageForm({ item, type, setHasImage, reset }: Props) {
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
        />
      )}
    </>
  );
}
