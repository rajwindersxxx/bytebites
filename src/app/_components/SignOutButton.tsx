import { HiOutlineLogout } from "react-icons/hi"
import { signOut } from "../_lib/Auth"
import { redirect } from "next/navigation";

function SignOutButton() {
  return (
    <form
    action={async () => {
      "use server"
      await signOut({redirect: false});
      redirect('/')

    }}
  >
    <button
      type="submit"
      className="my-2 flex items-center justify-start gap-2 p-2 transition-all hover:bg-natural-beige w-full"
    >
      <HiOutlineLogout className="h-5 w-5" />
      SignOut
    </button>
  </form>
  )
}

export default SignOutButton
