import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { CreateProjectModal } from "@/features/projects/components/CreateProjectModal";
import { CreateTaskModal } from "@/features/tasks/components/CreateTaskModal";
import { EditTaskModal } from "@/features/tasks/components/EditTaskModal";
import { CreateWorkspaceModal } from "@/features/workspaces/components/CreateWorkspaceModal";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen">
      <CreateWorkspaceModal />
      <CreateProjectModal />
      <CreateTaskModal />
      <EditTaskModal />
      <div className="flex w-full h-full">
        <div className="fixed left-0 top-0 hidden lg:block lg:w-[264px] h-full overflow-y-auto">
          <Sidebar />
        </div>
        <div className="lg:pl-[256px] w-full">
          <div className="mx-auto max-w-screen-2xl h-full">
            <Navbar />
            <main className="h-full py-8 px-6 flex flex-col">{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
}
