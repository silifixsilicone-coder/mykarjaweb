import { NextRequest, NextResponse } from "next/server";
import {
  verifyUsername,
  verifyPassword,
  createSession,
  setSessionCookie,
  clearSession,
  getSession,
} from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const authenticated = await getSession();
  return NextResponse.json({ authenticated });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, username, password } = body;

    // Handle logout
    if (action === "logout") {
      await clearSession();
      return NextResponse.json({ success: true, message: "Logged out successfully" });
    }

    // Handle login
    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required" },
        { status: 400 }
      );
    }

    const isUsernameValid = await verifyUsername(username);
    const isPasswordValid = await verifyPassword(password);

    if (!isUsernameValid || !isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid username or password" },
        { status: 401 }
      );
    }

    const token = await createSession();
    await setSessionCookie(token);

    return NextResponse.json({
      success: true,
      message: "Logged in successfully",
    });
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  await clearSession();
  return NextResponse.json({ success: true, message: "Logged out successfully" });
}
