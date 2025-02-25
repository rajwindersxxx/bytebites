import Link from "next/link";
import { SecondaryButton } from "./_components/Buttons";
export default function error() {
  return (
    <div className="flex h-[91vh] flex-col items-center justify-center gap-8 text-center">
      <h1 className="text-3xl font-semibold">Page Not Found !</h1>
      <Link href="/">
        <SecondaryButton className="bg-accent-500 text-primary-800 inline-block px-6 py-3 text-lg">
          Go back
        </SecondaryButton>
      </Link>
    </div>
  );
}
