import { getCurrent } from "@/features/auth/queries";
import { EditProjectForm } from "@/features/projects/components/EditProjectForm";
import { getProject } from "@/features/projects/queries";
import { redirect } from "next/navigation";
import React from "react";

interface ProjectIdSettingsPageProps {
  params: {
    projectId: string;
  };
}

export default async function ProjectIdSettingsPage({
  params,
}: ProjectIdSettingsPageProps) {
  const user = await getCurrent();
  const { projectId } = await params;
  const initialValues = await getProject({
    projectId,
  });

  if (!user) redirect("/sign-in");

  return (
    <div className="w-full lg:max-w-xl">
      <EditProjectForm initialValues={initialValues} />
    </div>
  );
}
