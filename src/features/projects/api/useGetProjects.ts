import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/rpc";

interface UseGetProjectsProps {
  workspaceId: string;
}

export const useGetProjects = ({ workspaceId }: UseGetProjectsProps) => {
  const query = useQuery({
    queryKey: ["projects", workspaceId],
    queryFn: async () => {
      const response = await client.api.projects.$get({
        query: { workspaceId },
      });

      if (!response) {
        throw new Error("Failed to retrieve projects");
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
