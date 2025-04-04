import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

export const useCurrent = () => {
  const query = useQuery({
    queryKey: ["current"],
    queryFn: async () => {
      const response = await client.api.auth.current.$get();

      if (!response) {
        return null;
      }

      try {
        const { data } = await response.json();

        return data ?? null;
      } catch {
        return null;
      }
    },
  });
  return query;
};
