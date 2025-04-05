import React from "react";
import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";
import { CreateWorkspaceForm } from "@/features/workspaces/components/CreateWorkspaceForm";

export default async function WorkspaceCreatePage() {
  const user = await getCurrent();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div className="w-full lg:max-w-xl">
      <CreateWorkspaceForm />
    </div>
  );
}
