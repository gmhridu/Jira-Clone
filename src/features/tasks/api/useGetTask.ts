"use client";

import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/rpc";

interface UseGetTaskProps {
  workspaceId: string;
  
}

export const useGetTask = ({ workspaceId }: UseGetTaskProps) => {
  const query = useQuery({
    queryKey: ["tasks", workspaceId],
    queryFn: async () => {
      const response = await client.api.tasks.$get({
        query: { workspaceId },
      });

      if (!response) {
        throw new Error("Failed to retrieve tasks");
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
