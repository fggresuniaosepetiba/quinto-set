import { AdminInactivityGuard } from "@/components/admin/AdminInactivityGuard";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminInactivityGuard>{children}</AdminInactivityGuard>;
}
