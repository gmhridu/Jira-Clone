"use client";

import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/rpc";

interface UseGetTaskProps {
  taskId: string;
}

export const useGetTask = ({ taskId }: UseGetTaskProps) => {
  const query = useQuery({
    queryKey: ["task", taskId],
    queryFn: async () => {
      const response = await client.api.tasks[":taskId"].$get({
        param: { taskId },
      });

      if (!response) {
        throw new Error("Failed to retrieve task");
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
