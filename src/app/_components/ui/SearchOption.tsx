interface Props {
  option: string;
  groupName: string;
  isChecked: boolean;
  onToggle: () => void;
  className?: string;
}

function SearchOption({
  option,
  groupName,
  isChecked,
  onToggle,
  className = "",
}: Props) {
  return (
    <label
      htmlFor={option}
      className={`m-1 inline-block rounded-full border px-2 py-1 cursor-pointer ${
        isChecked ? "bg-natural-beige" : ""
      } ${className}`}
    >
      {option}
      <input
        id={option}
        type="checkbox"
        name={groupName}
        value={option}
        checked={isChecked}
        onChange={onToggle}
        className="hidden"
      />
    </label>
  );
}

export default SearchOption;
