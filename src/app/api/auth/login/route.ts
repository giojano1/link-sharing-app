import { NextRequest, NextResponse } from "next/server";
import { loginSchema } from "@/features/auth/schemas";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import type {
  ApiResponse,
  LoginResponse,
} from "@/features/auth/types/auth-api.types";

export async function POST(request: NextRequest) {
  try {
    // 1. Parse JSON body with error handling
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

    // 2. Validate with loginSchema
    const validatedFields = loginSchema.safeParse(body);

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

    const { email, password } = validatedFields.data;

    // 3. Find user in database
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
      },
    });

    // 4. Check if user exists and has a password (not OAuth-only user)
    if (!user || !user.password) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "Invalid credentials",
            code: "INVALID_CREDENTIALS",
            fields: {
              email: ["Invalid email or password"],
            },
          },
        },
        { status: 401 }
      );
    }

    // 5. Verify password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "Invalid credentials",
            code: "INVALID_CREDENTIALS",
            fields: {
              email: ["Invalid email or password"],
            },
          },
        },
        { status: 401 }
      );
    }

    // 6. Return success with user data
    // The actual session will be established by NextAuth on the client side
    const response: ApiResponse<LoginResponse> = {
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email || email,
        },
        session: false, // Session will be established by client-side signIn
      },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Login error:", error);

    return NextResponse.json(
      {
        success: false,
        error: {
          message: "Something went wrong during login",
          code: "INTERNAL_ERROR",
        },
      },
      { status: 500 }
    );
  }
}
