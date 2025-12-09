import Header from "@/components/layout/header";
import { GalleryVerticalEnd } from "lucide-react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-muted flex h-svh flex-col ">
      <Header />
      <section className="w-full h-full flex-1 flex p-6 max-w-[1400px] mx-auto ">
        {children}
      </section>
    </div>
  );
}
