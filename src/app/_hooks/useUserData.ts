import { useQuery } from "@tanstack/react-query";
import { getUserData } from "../_actions/userActions";
import { UserData } from "../_types/FormData";

function useUserData() {
  const { data: userData } = useQuery<UserData>({
    queryKey: ["userData"],
    queryFn: getUserData,
    staleTime: Infinity,
  });
  return { userData };
}

export default useUserData;
