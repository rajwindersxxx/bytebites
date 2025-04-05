interface props {
  className?: string;
}
export default function Spinner({ className = "col-span-3" }: props) {
  return (
    <>
    <div></div>
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className={`spinner ${className}`}></div>
      </div>
    </>
  );
}

export function BarsSpinner({ className }: props) {
  return <div className={`loadingBars ${className}`}></div>;
}
export function ClassicSpinner({ className }: props) {
  return <div className={`classicLoader ${className}`}></div>;
}

// not used yet
export function MediumSpinner({ className }: props) {
  return <div className={`loadingSpinner ${className}`}></div>;
}
export function OverlaySpinner({ className }: props) {
  return (
    <div>
      <div className={`spinner ${className}`}></div>
    </div>
  );
}
