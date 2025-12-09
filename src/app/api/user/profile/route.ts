import { NextRequest, NextResponse } from "next/server";
import { updateProfileSchema } from "@/features/profile/schemas";
import prisma from "@/lib/prisma";
import { getCurrentUserId } from "@/lib/auth-utils";
import type {
  ApiResponse,
  UpdateProfileResponse,
} from "@/features/profile/types/profile-api.types";

export async function PATCH(request: NextRequest) {
  try {
    // 1. Authenticate user
    const userId = await getCurrentUserId();

    // 2. Parse JSON body with error handling
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "Invalid JSON in request body",
            code: "INVALID_JSON",
          },
        },
        { status: 400 }
      );
    }

    // 3. Validate with updateProfileSchema
    const validatedFields = updateProfileSchema.safeParse(body);

    if (!validatedFields.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "Validation failed",
            code: "VALIDATION_ERROR",
            fields: validatedFields.error.flatten().fieldErrors,
          },
        },
        { status: 400 }
      );
    }

    const { firstName, lastName } = validatedFields.data;

    // 4. Update user in database
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        firstName,
        lastName,
        updatedAt: new Date(),
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
      },
    });

    // 5. Return success response
    const response: ApiResponse<UpdateProfileResponse> = {
      success: true,
      data: {
        user: {
          id: updatedUser.id,
          email: updatedUser.email || "",
          firstName: updatedUser.firstName,
          lastName: updatedUser.lastName,
        },
      },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Profile update error:", error);

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
          message: "Failed to update profile",
          code: "INTERNAL_ERROR",
        },
      },
      { status: 500 }
    );
  }
}
