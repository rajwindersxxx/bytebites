interface props{
  className?: string;
}
export default function Spinner({className = 'col-span-3'}: props) {
  return <div className={`spinner ${className}`}></div>;
}
