"use server";

import prisma from "@/lib/prisma";
import { getCurrentUserId } from "@/lib/auth-utils";
import type { UserProfile } from "../types/user.types";

/**
 * Server action to get current user profile
 * Use this in Server Components and Server Actions
 */
export async function getCurrentUserProfile(): Promise<UserProfile | null> {
  try {
    const userId = await getCurrentUserId();

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        username: true,
        profileImage: true,
      },
    });

    if (!user) {
      return null;
    }

    return {
      ...user,
      email: user.email || "",
      publicProfileUrl: user.username ? `/profile/${user.username}` : null,
    };
  } catch (error) {
    console.error("Error fetching current user profile:", error);
    return null;
  }
}
