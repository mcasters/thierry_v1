import { FiTrash2 } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useSWRConfig } from 'swr';

type Props = {
  api: string;
  apiToUpdate: string;
};
export default function DeleteButton({ api, apiToUpdate }: Props) {
  const { mutate } = useSWRConfig();
  const handleDelete = (e) => {
    e.preventDefault();
    if (confirm('Sûr de vouloir supprimer ?')) {
      fetch(api).then((res) => {
        if (res.ok) {
          toast('supprimé');
          mutate(apiToUpdate);
        } else toast('Erreur à la suppression');
      });
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="iconButton"
      aria-label="Supprimer"
    >
      <FiTrash2 />
    </button>
  );
}
