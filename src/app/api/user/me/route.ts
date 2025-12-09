import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUserId } from "@/lib/auth-utils";
import type {
  ApiResponse,
  UserProfileResponse,
} from "@/features/user/types/user.types";

export async function GET() {
  try {
    // 1. Get authenticated user ID (throws if not authenticated)
    const userId = await getCurrentUserId();

    // 2. Fetch user profile from database
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

    // 3. Handle edge case: user deleted between session creation and now
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "User not found",
            code: "USER_NOT_FOUND",
          },
        },
        { status: 404 }
      );
    }

    // 4. Compute public profile URL
    const publicProfileUrl = user.username
      ? `/profile/${user.username}`
      : null;

    // 5. Return user profile
    const response: ApiResponse<UserProfileResponse> = {
      success: true,
      data: {
        user: {
          ...user,
          email: user.email || "", // Ensure email is string
          publicProfileUrl,
        },
      },
    };

    return NextResponse.json(response, {
      status: 200,
      headers: {
        // Cache for 30 seconds on client, revalidate on server
        "Cache-Control": "private, max-age=30, must-revalidate",
      },
    });
  } catch (error) {
    console.error("Error fetching current user:", error);

    // Handle unauthorized error (from getCurrentUserId)
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "Unauthorized",
            code: "UNAUTHORIZED",
          },
        },
        { status: 401 }
      );
    }

    // Generic error
    return NextResponse.json(
      {
        success: false,
        error: {
          message: "Failed to fetch user profile",
          code: "INTERNAL_ERROR",
        },
      },
      { status: 500 }
    );
  }
}
