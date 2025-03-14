interface props {
  className?: string;
}
export default function Spinner({ className = "col-span-3" }: props) {
  return <div className={`spinner ${className}`}></div>;
}
export function MediumSpinner({ className }: props) {
  return <div className={`loadingSpinner ${className}`}></div>;
}
export function OverlaySpinner({ className }: props){
  return <div><div className={`spinner ${className}`}></div></div>
}
