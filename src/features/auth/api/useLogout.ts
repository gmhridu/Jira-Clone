import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<(typeof client.api.auth.login)["$post"]>;

export const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.auth.logout["$post"]();

      if (!response.ok) {
        throw new Error("Failed to logout");
      }

      return await response.json();
    },
    onSuccess: () => {
      router.refresh();
      router.push("/sign-in");
      queryClient.removeQueries({ queryKey: ["current"] });
      toast.success("Logged out successfully!");
    },
    onError: () => {
      toast.error("Failed to logout");
    },
  });
  return mutation;
};
