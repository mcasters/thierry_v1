import useModal from '@/components/admin/form/modal/useModal';
import Modal from '@/components/admin/form/modal/Modal';
import { Content } from '@/interfaces';
import HomeForm from '@/components/admin/form/HomeForm';
import { Label } from '@prisma/client';

type Props = {
  content?: Content;
  label: Label;
  buttonText: string;
};
export default function UpdateHomeButton({
  content,
  label,
  buttonText,
}: Props) {
  const { isOpen, toggle } = useModal();

  return (
    <>
      <button
        className="adminButton"
        onClick={(e) => {
          e.preventDefault();
          toggle();
        }}
      >
        {buttonText}
      </button>
      <Modal isOpen={isOpen} toggle={toggle}>
        <HomeForm toggleModal={toggle} content={content} label={label} />
      </Modal>
    </>
  );
}
