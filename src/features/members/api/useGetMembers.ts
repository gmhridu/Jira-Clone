import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/rpc";

interface UseGetMembersProps {
  workspaceId: string;
}

export const useGetMembers = ({ workspaceId }: UseGetMembersProps) => {
  const query = useQuery({
    queryKey: ["members", workspaceId],
    queryFn: async () => {
      const response = await client.api.members.$get({
        query: { workspaceId },
      });

      if (!response) {
        throw new Error("Failed to retrieve members");
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
