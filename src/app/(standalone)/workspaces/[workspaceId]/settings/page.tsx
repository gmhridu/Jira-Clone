import { getCurrent } from "@/features/auth/queries";
import { getWorkspace } from "@/features/workspaces/queries";
import { EditWorkspaceForm } from "@/features/workspaces/components/EditWorkspaceForm";
import { redirect } from "next/navigation";
import React from "react";

interface WorkspaceIdSettingsPageProps {
  params: {
    workspaceId: string;
  };
}

export default async function WorkspaceIdSettingsPage({
  params,
}: WorkspaceIdSettingsPageProps) {
  const user = await getCurrent();
  const { workspaceId } = await params;

  if (!user) {
    redirect("/sign-in");
  }

  const initialValues = await getWorkspace({
    workspaceId,
  });

  return (
    <div className="w-full lg:max-w-xl">
      <EditWorkspaceForm initialValues={initialValues} />
    </div>
  );
}
