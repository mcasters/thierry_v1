import { FiTrash2 } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useSWRConfig } from 'swr';

import s from './form.module.css';
import { Label } from '@prisma/client';

type Props = {
  label: Label;
  disabled: boolean;
};
export default function DeleteHomeButton({ label, disabled }: Props) {
  const { mutate } = useSWRConfig();
  const api = `/api/home`;
  const apiToUpdate = `/api/home`;
  const handleDelete = async () => {
    if (confirm('Sûr de vouloir supprimer ?')) {
      fetch(`${api}/${label}`, { method: 'DELETE' }).then((res) => {
        if (res.ok) {
          toast(`${label} supprimé`);
          mutate(apiToUpdate);
        } else toast('Erreur à la suppression');
      });
    }
  };

  return (
    <button onClick={handleDelete} className="adminButton" disabled={disabled}>
      Supprimer
    </button>
  );
}
