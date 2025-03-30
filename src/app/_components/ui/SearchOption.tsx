interface props {
  option: string;
  groupName: string;
  className?: string;
}
function SearchOption({
  option,
  groupName,
  className = `has-[:checked]:bg-natural-beige`,
}: props) {

  return (
    <>
      <label
        htmlFor={option}
        className={`m-1 inline-block rounded-full border px-2 py-1 ${className}`}
      >
        {option}
        <input
          id={option}
          type="checkbox"
          name={groupName}
          value={option}
          className={`hidden`}
        />
      </label>
    </>
  );
}

export default SearchOption;
