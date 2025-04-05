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

      try {
        const json = await response.json();

        if ("data" in json) {
          return json.data ?? null;
        } else {
          return null;
        }
      } catch {
        return null;
      }
    },
  });

  return query;
};
