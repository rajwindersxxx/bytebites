import { useQuery } from "@tanstack/react-query";
import { getUserData } from "../_actions/userActions";

function useUserData() {
  const { data: userData } = useQuery({
    queryKey: ["userData"],
    queryFn: getUserData,
    staleTime: Infinity,
  });
  return { userData };
}

export default useUserData;
