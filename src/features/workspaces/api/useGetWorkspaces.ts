import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/rpc";

export const useGetWorkSpaces = () => {
  const query = useQuery({
    queryKey: ["workspaces"],
    queryFn: async () => {
      const response = await client.api.workspaces.$get();

      if (!response) {
        throw new Error("Failed to retrieve workspaces");
      }

      const { data } = await response.json();

      return data;
    },
  });

  return query;
};
