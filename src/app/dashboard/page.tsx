'use client';

import { useSession } from "next-auth/react";

function Page() {
  const session = useSession();
  
  return (
    <div>
     MAIN DASHBOARD
    </div>
  )
}

export default Page

