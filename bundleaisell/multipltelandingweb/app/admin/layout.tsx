import { AdminLayout } from "@/components/admin/AdminLayout";

export const metadata = {
  title: "Admin Dashboard | DIGITAL BUNDLE",
  description: "Manage your landing pages and digital products.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayout>{children}</AdminLayout>;
}
