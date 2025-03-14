import { PrimaryButton, SecondaryButton } from "../ui/Buttons";
import { useModal } from "../ui/Modal";
interface props {
  callback: (...args: never[]) => void;
  message?: string;
}
function ConfirmationModal({
  callback,
  message = "Do you want to delete this item",
}: props) {
  const { closeModal } = useModal();
  return (
    <div className="flex flex-col gap-10 p-10">
      <h4 className="text-center text-xl">{message}</h4>
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
