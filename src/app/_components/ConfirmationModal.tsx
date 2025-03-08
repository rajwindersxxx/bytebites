import { PrimaryButton, SecondaryButton } from "./Buttons";
import { useModal } from "./Modal";
interface props {
  callback: (...args: never[]) => void;
}
function ConfirmationModal({ callback }: props) {
  const { closeModal } = useModal();
  return (
    <div className="flex flex-col gap-10 p-10">
      <h4 className="text-center text-xl">
        Do you want to delete this item
      </h4>
      <div className="flex justify-center gap-4">
        <SecondaryButton type="button" onClick={closeModal}>
          Cancel
        </SecondaryButton>
        <PrimaryButton
          type="button"
          onClick={() => {
            callback();
            closeModal();
          }}
        >
          Confirm
        </PrimaryButton>
      </div>
    </div>
  );
}

export default ConfirmationModal;
