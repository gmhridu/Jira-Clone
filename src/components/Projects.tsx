"use client";
import { useGetProjects } from "@/features/projects/api/useGetProjects";
import { ProjectAvatar } from "@/features/projects/components/ProjectAvatar";
import { useCreateProjectModal } from "@/features/projects/hooks/useCreateProjectModal";
import { useWorkspaceId } from "@/features/workspaces/hooks/useWorkspaceId";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiAddCircleFill } from "react-icons/ri";

export const Projects = () => {
  const projectId = null;

  const workspaceId = useWorkspaceId();
  const pathname = usePathname();
  const { open } = useCreateProjectModal();
  const { data, isLoading, isFetching, isPending, isRefetching } =
    useGetProjects({
      workspaceId,
    });
  const isLoadingState = isLoading || isPending || isFetching || isRefetching;

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase text-neutral-500">Projects</p>
        <RiAddCircleFill
          onClick={open}
          className="size-5 text-neutral-500 cursor-pointer hover:opacity-75 transition"
        />
      </div>
      {isLoadingState ? (
        <div className="w-full bg-neutral-200 font-medium p-3 cursor-pointer">
          <div className="flex items-center h-full">
            <Loader2 className="mr-2 animate-spin text-neutral-800" />
            <p className="text-xs text-neutral-900">Loading projects...</p>
          </div>
        </div>
      ) : (
        data?.documents.map((project) => {
          const href = `/workspaces/${workspaceId}/projects/${projectId}`;
          const isActive = pathname === href;

          return (
            <Link href={href} key={project.$id}>
              <div
                className={cn(
                  "flex items-center gap-2.5 p-2.5 rounded-md hover:opacity-75 transition cursor-pointer text-neutral-500",
                  isActive &&
                    "bg-white shadow-sm hover:opacity-100 text-primary"
                )}
              >
                <ProjectAvatar image={project.imageUrl} name={project.name} />
                <span className="truncate">{project.name}</span>
              </div>
            </Link>
          );
        })
      )}
    </div>
  );
};
