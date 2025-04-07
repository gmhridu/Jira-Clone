import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ResponseType = InferResponseType<(typeof client.api.auth.login)["$post"]>;
type RequestType = InferRequestType<(typeof client.api.auth.login)["$post"]>;

export const useLogin = () => {
  const router = useRouter();
  // const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  // const redirect = searchParams.get("redirect");

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.auth.login["$post"]({ json });

      if (!response.ok) {
        throw new Error("Failed to login");
      }

      return await response.json();
    },
    onSuccess: () => {
      router.refresh();
      router.push("/");
      queryClient.invalidateQueries({ queryKey: ["current"] });
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      toast.success("Logged in successfully!");
    },
    onError: () => {
      toast.error("Failed to login");
    },
  });
  return mutation;
};
