import { Item } from '@/interfaces';
import SingleImageForm from '@/components/admin/form/imageForm/SingleImageForm';
import { TYPE } from '@/constants';
import MultipleImagesForm from '@/components/admin/form/imageForm/MultipleImagesForm';

type Props = {
  item: Item | null;
  type: string;
};

export default function ImageForm({ item, type }: Props) {
  return (
    <>
      {type === TYPE.PAINTING && <SingleImageForm item={item} />}
      {type === TYPE.SCULPTURE && <MultipleImagesForm item={item} />}
    </>
  );
}
