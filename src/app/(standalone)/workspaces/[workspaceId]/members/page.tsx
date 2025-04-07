import { getCurrent } from "@/features/auth/queries";
import { MembersList } from "@/features/workspaces/components/MembersList";
import { redirect } from "next/navigation";
import React from "react";

export default async function WorkspaceIdMembersPage() {
  const user = await getCurrent();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div className="w-full lg:max-w-xl">
      <MembersList />
    </div>
  );
}
