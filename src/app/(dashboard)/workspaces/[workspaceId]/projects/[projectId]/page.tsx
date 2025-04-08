import { getCurrent } from "@/features/auth/queries";
import { ProjectAvatar } from "@/features/projects/components/ProjectAvatar";
import { getProject } from "@/features/projects/queries";
import { redirect } from "next/navigation";
import React from "react";

interface ProjectIdPageProps {
  params: {
    projectId: string;
  };
}

export default async function ProjectIdPage({ params }: ProjectIdPageProps) {
  const user = await getCurrent();
  const { projectId } = await params;

  if (!user) {
    redirect("/sign-in");
  }
  const initialValues = await getProject({
    projectId,
  });

  if (!initialValues) {
    throw new Error("Project not found!");
  }

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <ProjectAvatar
            image={initialValues?.imageUrl}
            name={initialValues?.name}
            className="size-5"
          />
          <p className="text-lg font-semibold">{initialValues.name}</p>
        </div>
      </div>
    </div>
  );
}
