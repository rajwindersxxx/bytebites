import { IoDiamond } from "react-icons/io5";
import { PrimaryButton, SecondaryButton } from "./Buttons";
import { useModal } from "./Modal";

const purchaseOptions = [
  {
    points: 25,
    cost: 50,
  },
  {
    points: 50,
    cost: 100,
  },
  { points: 75, cost: 150 },
  { points: 200, cost: 200 },
];
interface props {
  totalPoints: number | null;
}
function UserPointsModal({ totalPoints }: props) {
  const { closeModal } = useModal();
  return (
    <form
      className="flex max-w-[400px] flex-col gap-4"
      action="/api/checkout_sessions"
      method="POST"
    >
      <h2 className="text-2xl">
        {totalPoints
          ? `You currently have ${totalPoints} Points`
          : "You are out of points , Buy more"}
      </h2>
      <h3 className="text-md text-accent">
        Select the amount of points you would like to purchase.
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <ul className="flex flex-wrap rounded-md border border-accent px-4 py-2">
          {purchaseOptions.map((item, i) => (
            <li key={item.cost} className="w-full">
              <input
                id={`id-${i}`}
                type="radio"
                value={item.points}
                defaultChecked={!i}
                name="points"
                className="peer hidden"
              />
              <label
                htmlFor={`id-${i}`}
                className="flex w-full cursor-pointer items-center justify-between rounded py-3 text-sm font-medium transition-all peer-checked:text-accent"
              >
                <div className="flex items-center gap-2">
                  {item.points}
                  <IoDiamond />
                </div>
                ₹{item.cost}
              </label>
            </li>
          ))}
        </ul>
        <div className="flex flex-col justify-center gap-4">
          <PrimaryButton>Check out</PrimaryButton>
          <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>
        </div>
      </div>
      <p className="text-accent text-center">Points can be used to generate AI recipes</p>

    </form>
  );
}

export default UserPointsModal;
