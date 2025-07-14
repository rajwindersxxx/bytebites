import { useQuery } from "@tanstack/react-query";
import { getUserData } from "../_actions/userActions";
import { UserData } from "../_types/FormData";
import { useSession } from "next-auth/react";

function useUserData() {
  const { data } = useSession(); // separate hook that gets userID
  const { data: userData } = useQuery<UserData>({
    queryKey: ["userData"],
    queryFn: getUserData,
    staleTime: Infinity,
    enabled: !!data?.user?.id
  });

  return { userData };
}

export default useUserData;
