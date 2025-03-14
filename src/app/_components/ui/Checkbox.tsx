import { ChangeEvent } from "react";
import { CheckIcon } from "./Icons";
interface props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean | undefined;
}
function Checkbox({ onChange, checked }: props) {
  return (
    <div className="inline-flex items-center">
      <label className="relative flex cursor-pointer items-center">
        <input
          onChange={onChange}
          checked={checked}
          type="checkbox"
          className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-slate-800 shadow transition-all checked:border-slate-800 checked:bg-accent hover:shadow-md dark:border-slate-300"
          id="check"
        />
        <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-white opacity-0 peer-checked:opacity-100">
          <CheckIcon />
        </span>
      </label>
    </div>
  );
}

export default Checkbox;
