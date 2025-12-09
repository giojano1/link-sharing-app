import Header from "@/components/layout/header";
import { GalleryVerticalEnd } from "lucide-react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-muted flex min-h-svh flex-col p-6 max-600:p-0  gap-6 ">
      <Header />
      <section className="border w-full flex-1">{children}</section>
    </div>
  );
}
