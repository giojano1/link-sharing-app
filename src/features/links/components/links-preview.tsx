"use client";

import { useCurrentUser } from "@/features/user/hooks/use-current-user";
import Image from "next/image";

export default function LinksPreview() {
  const { data: user, isLoading, error } = useCurrentUser();
  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="w-[550px] bg-white h-full flex justify-center items-center rounded-[12px] p-10">
      {/* mobile */}
      <div className="h-[calc(100%-200px)] w-[400px]  border-2 border-black border-t-10 rounded-4xl shadow-2xl py-10">
        {/* info */}
        <section>
          <div className="size-24 rounded-full bg-muted flex justify-center items-center mx-auto">
            {user?.publicProfileUrl ? (
              <Image src={user?.publicProfileUrl} alt="img" fill priority />
            ) : (
              <div className="w-full h-full  flex justify-center items-center text-gray-500">
                No Image
              </div>
            )}
          </div>
        </section>
        <section className=" mt-4  flex justify-center flex-col items-center gap-1">
          <div className="flex gap-2 font-semibold text-lg">
            <span>{user?.firstName ? user.firstName : "First Name"}</span>
            <span>{user?.lastName ? user.lastName : "Last Name"}</span>
          </div>
          <p className="text-sm">{user?.email}</p>
        </section>
      </div>
    </div>
  );
}
