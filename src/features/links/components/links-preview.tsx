"use client";

import { useCurrentUser } from "@/features/user/hooks/use-current-user";
import Image from "next/image";

export default function LinksPreview() {
  const { data: user, isLoading, error } = useCurrentUser();
  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="max-1250:w-[450px] max-1000:w-[350px] max-900:hidden flex h-full w-[550px] items-center justify-center overflow-y-auto rounded-[12px] bg-white py-5">
      <div className="links-preview-size border-border rounded-4xl border-2 border-t-10 py-10 shadow-2xl">
        <section>
          <div className="bg-muted mx-auto flex size-24 items-center justify-center rounded-full">
            {user?.publicProfileUrl ? (
              <Image src={user?.publicProfileUrl} alt="img" fill priority />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-gray-500">
                No Image
              </div>
            )}
          </div>
        </section>
        <section className="mt-4 flex flex-col items-center justify-center gap-1">
          <div className="flex gap-2 text-lg font-semibold">
            <span>{user?.firstName ? user.firstName : "First Name"}</span>
            <span>{user?.lastName ? user.lastName : "Last Name"}</span>
          </div>
          <p className="text-sm">{user?.email}</p>
        </section>
      </div>
    </div>
  );
}
