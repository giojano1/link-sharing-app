import Header from "@/components/layout/header";
import LinksPreview from "@/features/links/components/links-preview";
import { getCurrentUserProfile } from "@/features/user/actions/get-current-user";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch user data on server for initial render
  const initialUserData = await getCurrentUserProfile();

  return (
    <div className="bg-muted flex h-svh flex-col ">
      {/* Pass initial data to client component */}
      <div className="shrink-0">
        <Header initialUserData={initialUserData} />
      </div>
      <section className="w-full flex-1 flex p-6 max-w-[1400px] mx-auto gap-6 min-h-0 overflow-auto">
        <LinksPreview />
        {children}
      </section>
    </div>
  );
}
