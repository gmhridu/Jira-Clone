"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useWorkspaceId } from "../hooks/useWorkspaceId";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, Loader2, MoreVerticalIcon } from "lucide-react";
import DottedSeparator from "@/components/DottedSeparator";
import { useGetMembers } from "@/features/members/api/useGetMembers";
import { Fragment } from "react";
import { MemberAvatar } from "@/features/members/components/MemberAvatar";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteMember } from "@/features/members/api/useDeleteMember";
import { useUpdateMember } from "@/features/members/api/useUpdateMember";
import { MemberRole } from "@/features/members/type";
import { useConfirm } from "@/hooks/useConfirm";
export const MembersList = () => {
  const workspaceId = useWorkspaceId();
  const [ConfirmDialog, confirm] = useConfirm(
    "Remove Member",
    "This member will be removed from the workspace",
    "destructive"
  );
  const { data, isLoading, isPending } = useGetMembers({ workspaceId });

  const { mutate: deleteMember, isPending: isDeletingMember } =
    useDeleteMember();
  const { mutate: updateMember, isPending: isUpdatingMember } =
    useUpdateMember();

  const handleUpdateMember = (memberId: string, role: MemberRole) => {
    updateMember({
      json: { role },
      param: { memberId },
    });
  };

  const handleDeleteMember = async (memberId: string) => {
    const res = await confirm();

    if (!res) return;

    deleteMember({
      param: { memberId },
    });
  };

  if (isLoading && isPending) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <Card className="w-full h-full border-none shadow-none">
      <ConfirmDialog />
      <CardHeader className="flex flex-row items-center gap-x-4 space-y-0">
        <Button variant={"secondary"} size={"sm"} asChild>
          <Link href={`/workspaces/${workspaceId}`}>
            <ArrowLeftIcon />
            Back
          </Link>
        </Button>
        <CardTitle className="text-xl font-bold">Members List</CardTitle>
      </CardHeader>
      <div className="p-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        {data?.documents.length === 0 ? (
          <p className="text-sm text-center">No members found!</p>
        ) : (
          <>
            {data?.documents?.map((member, index) => (
              <Fragment key={member.$id}>
                <div className="flex items-center gap-2">
                  <MemberAvatar
                    className="size-10"
                    fallbackClassName="text-lg"
                    name={member.name}
                  />
                  <div className="flex flex-col">
                    <p className="text-sm font-medium">{member.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {member.email}
                    </p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        className="ml-auto"
                        variant={"secondary"}
                        size={"icon"}
                      >
                        <MoreVerticalIcon className="size-4 text-muted-foreground" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      side="bottom"
                      align="end"
                      className="cursor-pointer"
                    >
                      <DropdownMenuItem
                        className="font-medium cursor-pointer"
                        onClick={() =>
                          handleUpdateMember(member.$id, MemberRole.ADMIN)
                        }
                        disabled={isUpdatingMember}
                      >
                        Set As Admin
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="font-medium cursor-pointer"
                        onClick={() =>
                          handleUpdateMember(member.$id, MemberRole.MEMBER)
                        }
                        disabled={isUpdatingMember}
                      >
                        Set As Member
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="font-medium text-amber-700 cursor-pointer"
                        onClick={() => handleDeleteMember(member.$id)}
                        disabled={isDeletingMember}
                      >
                        Remove {member.name}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                {index < data.documents.length - 1 && (
                  <Separator className="my-2.5" />
                )}
              </Fragment>
            ))}
          </>
        )}
      </CardContent>
    </Card>
  );
};
