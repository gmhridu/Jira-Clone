"use client";

import { RiAddCircleFill } from "react-icons/ri";

import { useGetWorkSpaces } from "@/features/workspaces/api/useGetWorkspaces";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { WorkspaceAvatar } from "@/features/auth/components/WorkspaceAvatar";

export const WorkspaceSwitcher = () => {
  const { data: workspaces } = useGetWorkSpaces();

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase text-neutral-500">Workspaces</p>
        <RiAddCircleFill className="size-5 text-neutral-500 cursor-pointer hover:opacity-75 transition" />
      </div>
      <Select>
        <SelectTrigger className="w-full bg-neutral-200 font-medium p-1 cursor-pointer">
          <SelectValue placeholder={"No workspace selected"} />
        </SelectTrigger>
        <SelectContent>
          {workspaces?.documents.map((workspace) => {
            const { $id, name, imageUrl } = workspace;
            return (
              <SelectItem key={$id} value={$id} className="cursor-pointer pl-2">
                <div className="flex justify-start items-center gap-3 font-medium">
                  <WorkspaceAvatar name={name} image={imageUrl} />
                  <span className="truncate">{name}</span>
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};
