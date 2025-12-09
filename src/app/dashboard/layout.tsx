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
      <Header initialUserData={initialUserData} />
      <section className="w-full h-full flex-1 flex p-6 max-w-[1400px] mx-auto gap-6  ">
        <LinksPreview />
        {children}
      </section>
    </div>
  );
}
