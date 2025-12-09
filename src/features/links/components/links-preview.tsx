"use client";

import { useCurrentUser } from "@/features/user/hooks/use-current-user";
import Image from "next/image";

export default function LinksPreview() {
  const { data: user, isLoading, error } = useCurrentUser();
  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="w-[550px] max-1250:w-[450px] max-1000:w-[350px] bg-white h-full flex    justify-center items-center rounded-[12px]  overflow-y-auto py-5 max-900:hidden">
      <div className="h-[calc(100%-250px)] w-[80%] min-h-[600px] max-h-[800px] max-1100:max-h-[650px]  border-2 border-black border-t-10 rounded-4xl shadow-2xl py-10 ">
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
