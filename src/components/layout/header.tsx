"use client";

import { useCurrentUser } from "@/features/user/hooks/use-current-user";
import type { UserProfile } from "@/features/user/types/user.types";
import { Eye, GalleryVerticalEnd } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import Navbar from "./navbar";

interface HeaderProps {
  initialUserData: UserProfile | null;
}

export default function Header({ initialUserData }: HeaderProps) {
  // Use React Query with server data as initialData
  const { data: user, isLoading } = useCurrentUser({
    initialData: initialUserData ?? undefined,
  });

  // Compute display name
  const displayName =
    user?.firstName || user?.username || user?.email?.split("@")[0] || "User";

  // Get preview URL (user's public profile or generic preview)
  const previewUrl = user?.publicProfileUrl || "/preview";

  return (
    <header className="h-[78px] max-600:h-[72px] bg-white   px-6 items-center justify-between flex">
      <div className="flex items-center gap-2 self-center font-medium">
        <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
          <GalleryVerticalEnd className="size-4" />
        </div>
        <span className="max-500:hidden">Devlinks</span>
      </div>
      {/* navigation */}
      <div>
        <Navbar />
      </div>
      {/* preview */}
      <div className="flex items-center gap-4">
        {/* Optional: Display user avatar/name */}
        {user && !isLoading && (
          <div className="hidden md:flex items-center gap-2">
            {user.profileImage && (
              <img
                src={user.profileImage}
                alt={displayName}
                className="w-8 h-8 rounded-full object-cover"
              />
            )}
            <span className="text-sm font-medium">{displayName}</span>
          </div>
        )}

        {/* Preview button */}
        <Button asChild>
          <Link href={previewUrl}>
            <span className="max-600:hidden">Preview</span>
            <Eye className="hidden max-600:block" />
          </Link>
        </Button>
      </div>
    </header>
  );
}
