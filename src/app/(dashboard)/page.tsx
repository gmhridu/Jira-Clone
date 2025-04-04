import { getCurrent } from "@/features/auth/action";
import { CreateWorkspaceForm } from "@/features/workspaces/components/CreateWorkspcaeForm";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getCurrent();

  if (!user) {
   redirect("/sign-in");
  }
  return (
    <div className="bg-neutral-500 p-4 h-full">
      <CreateWorkspaceForm />
    </div>
  );
}
 