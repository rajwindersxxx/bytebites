import { PrimaryButton, SecondaryButton } from "./Buttons";
import {  useModal } from "./Modal";
interface props {
  confirmFunction: () => void;

}
function ConfirmationModal({ confirmFunction }: props) {
  const { closeModal } = useModal();
  return (
      <div className="flex flex-col gap-10 p-10">
        <h4 className="text-center text-xl">
          Do you want to delete this item from bookmarks
        </h4>
        <div className="flex justify-center gap-4">
          <SecondaryButton type="button" onClick={closeModal}>
            Cancel
          </SecondaryButton>
          <PrimaryButton type="button" onClick={confirmFunction}>
            Confirm
          </PrimaryButton>
        </div>
      </div>
  );
}

export default ConfirmationModal;
