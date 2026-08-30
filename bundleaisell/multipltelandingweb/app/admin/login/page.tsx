import { AdminLogin } from "@/components/admin/AdminLogin";

export const metadata = {
  title: "Admin Login | DIGITAL BUNDLE",
  description: "Sign in to manage your landing pages and digital products.",
};

export default function AdminLoginPage() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-slate-50">
      <AdminLogin />
    </main>
  );
}
