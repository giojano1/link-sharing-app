import { NextRequest, NextResponse } from "next/server";
import { registerSchema } from "@/features/auth/schemas";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { signIn } from "@/lib/auth";
import type {
  ApiResponse,
  RegisterResponse,
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

    // 2. Validate with registerSchema
    const validatedFields = registerSchema.safeParse(body);

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

    // 3. Check for existing user
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "User with this email already exists",
            code: "DUPLICATE_EMAIL",
            fields: {
              email: ["User with this email already exists"],
            },
          },
        },
        { status: 409 }
      );
    }

    // 4. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5. Create user in database
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
      },
    });

    // 6. Sign in the user
    const signInResult = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    // Check if signIn was successful
    const sessionEstablished = signInResult ? !signInResult.error : true;

    // 7. Return consistent API response format
    const response: ApiResponse<RegisterResponse> = {
      success: true,
      data: {
        user: {
          id: newUser.id,
          email: newUser.email || email, // Fallback to validated email if null
        },
        session: sessionEstablished,
      },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Registration error:", error);

    return NextResponse.json(
      {
        success: false,
        error: {
          message: "Something went wrong during registration",
          code: "INTERNAL_ERROR",
        },
      },
      { status: 500 }
    );
  }
}
