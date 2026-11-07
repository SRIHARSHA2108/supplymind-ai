import Sidebar from "./sidebar";
import Topbar from "./topbar";
import AICopilot from "@/components/ai-copilot";

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_top_right,_rgba(34,211,238,0.08),_transparent_32%),radial-gradient(circle_at_top_left,_rgba(139,92,246,0.06),_transparent_28%),_#f8fafc] text-slate-900">
      <div className="flex">
        <Sidebar />

        <div className="min-w-0 flex-1">
          <Topbar />

          <main className="p-4 sm:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>

      <AICopilot />
    </div>
  );
}
