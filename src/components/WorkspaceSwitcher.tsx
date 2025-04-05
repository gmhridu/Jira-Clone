"use client";

import { RiAddCircleFill } from "react-icons/ri";

import { useRouter } from "next/navigation";
import { useGetWorkSpaces } from "@/features/workspaces/api/useGetWorkspaces";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { WorkspaceAvatar } from "@/features/auth/components/WorkspaceAvatar";
import { useWorkspaceId } from "@/features/workspaces/hooks/useWorkspaceId";
import { useCreateWorkspaceModal } from "@/features/workspaces/hooks/useCreateWorkspaceModal";
import { Loader2 } from "lucide-react";

export const WorkspaceSwitcher = () => {
  const workspaceId = useWorkspaceId();
  const router = useRouter();
  const {
    data: workspaces,
    isLoading,
    isPending,
    isFetching,
    isRefetching,
  } = useGetWorkSpaces();
  const { open } = useCreateWorkspaceModal();

  const onSelect = (id: string) => {
    router.push(`/workspaces/${id}`);
  };

  // if (isLoading) {
  //   return (
  //     <div className="flex items-center h-full">
  //       <Loader2 className="mr-2 animate-spin text-neutral-800" />
  //       <p className="text-xs text-neutral-900">Loading workspaces...</p>
  //     </div>
  //   );
  // }

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase text-neutral-500">Workspaces</p>
        <RiAddCircleFill
          onClick={open}
          className="size-5 text-neutral-500 cursor-pointer hover:opacity-75 transition"
        />
      </div>
      {isLoading || isPending || isFetching || isRefetching ? (
        <div className="w-full bg-neutral-200 font-medium p-3 cursor-pointer">
          <div className="flex items-center h-full">
            <Loader2 className="mr-2 animate-spin text-neutral-800" />
            <p className="text-xs text-neutral-900">Loading workspaces...</p>
          </div>
        </div>
      ) : (
        <>
          <Select onValueChange={onSelect} value={workspaceId}>
            <SelectTrigger className="w-full bg-neutral-200 font-medium p-1 cursor-pointer">
              <SelectValue placeholder={"No workspace selected"} />
            </SelectTrigger>
            <SelectContent>
              {workspaces?.documents.map((workspace) => {
                const { $id, name, imageUrl } = workspace;
                return (
                  <SelectItem
                    key={$id}
                    value={$id}
                    className="cursor-pointer pl-2"
                  >
                    <div className="flex justify-start items-center gap-3 font-medium">
                      <WorkspaceAvatar name={name} image={imageUrl} />
                      <span className="truncate">{name}</span>
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </>
      )}
    </div>
  );
};
