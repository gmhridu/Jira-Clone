"use client";

import DottedSeparator from "@/components/DottedSeparator";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { useInviteCode } from "../hooks/useInviteCode";
import { useWorkspaceId } from "../hooks/useWorkspaceId";
import { useJoinWorkspace } from "../api/useJoinWorkspace";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface JoinWorkspaceFromProps {
  initialValues: {
    name: string;
  };
}

export const JoinWorkspaceForm = ({
  initialValues,
}: JoinWorkspaceFromProps) => {
  const workspaceId = useWorkspaceId();
  const inviteCode = useInviteCode();
  const { mutate, isPending } = useJoinWorkspace();
  const router = useRouter();

  const onSubmit = () => {
    mutate(
      {
        param: { workspaceId },
        json: {
          code: inviteCode,
        },
      },
      {
        onSuccess: (response) => {
          if ("data" in response) {
            const { data } = response;

            router.push(`/workspaces/${data.$id}`);
            toast.success("Successfully joined workspace!");
          }
        },
        onError: () => {
          toast.error(
            "Failed to join workspace. Please check your invite code."
          );
        },
      }
    );
  };

  return (
    <Card className="w-full h-full border-none shadow-none">
      <CardHeader className="p-7">
        <CardTitle className="text-xl font-bold">Join workspace</CardTitle>
        <CardDescription>
          You&apos;ve been invited to join <strong>{initialValues.name}</strong>
        </CardDescription>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        <div className="flex flex-col lg:flex-row gap-12 items-center justify-between">
          <Button
            className="w-full lg:w-fit"
            variant={"secondary"}
            size={"lg"}
            asChild
            type="button"
            disabled={isPending}
          >
            <Link href={"/"}>Cancel</Link>
          </Button>
          <Button
            className="w-full lg:w-fit"
            size={"lg"}
            type="button"
            disabled={isPending}
            onClick={onSubmit}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 animate-spin" />
                <span>Joining...</span>
              </>
            ) : (
              "Join"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
