import DashboardAside from "@/features/dashboard/ui/aside";
import DashboardHeader from "@/features/dashboard/ui/header";

export default function DashboardLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F6F6F6]">
      <DashboardHeader />
      <div className="flex">
        <DashboardAside />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
