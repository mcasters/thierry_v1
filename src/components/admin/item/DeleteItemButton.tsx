import { FiTrash2 } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useSWRConfig } from 'swr';

import s from './ListComponent.module.css';

type Props = {
  id: number;
  type: string;
};
export default function DeleteItemButton({ id, type }: Props) {
  const { mutate } = useSWRConfig();
  const api = `/api/${type}/delete`;
  const apiToUpdate = `/api/${type}`;
  const handleDelete = async () => {
    if (confirm('Sûr de vouloir supprimer ?')) {
      fetch(`${api}/${id}`).then((res) => {
        if (res.ok) {
          toast(`${type} supprimée`);
          mutate(apiToUpdate);
        } else toast('Erreur à la suppression');
      });
    }
  };

  return (
    <button
      onClick={handleDelete}
      className={s.iconButton}
      aria-label="Supprimer"
    >
      <FiTrash2 />
    </button>
  );
}
