import Link from 'next/link';
import { SecondaryButton } from './components/button';
export default function error() {
  return (
    <div className="flex justify-center flex-col gap-8 items-center h-[91vh] text-center">
      <h1 className="text-3xl font-semibold">Page Not Found !</h1>
      <Link href='/'>
        <SecondaryButton className="inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg">
          Go back
        </SecondaryButton>
      </Link>
    </div>
  );
}
