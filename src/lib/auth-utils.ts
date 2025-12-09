import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

/**
 * Get the current session or redirect to login
 * Use this in server components and actions that require authentication
 */
export async function requireAuth() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  return session;
}

/**
 * Get the current session or return null
 * Use this when authentication is optional
 */
export async function getSession() {
  return await auth();
}

/**
 * Get the current user ID or throw an error
 * Use this in server actions
 */
export async function getCurrentUserId() {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  return session.user.id;
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated() {
  const session = await auth();
  return !!session?.user?.id;
}
