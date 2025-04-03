import { NextResponse } from "next/server";
import requestIp from "request-ip";

// Define rate limiting store
const rateLimitMap = new Map<string, { count: number; lastAttempt: number }>();

const MAX_ATTEMPTS = 5; // Max 5 requests per 15 minutes
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

export async function GET(req: Request) {
  const ip = requestIp.getClientIp({
    headers: Object.fromEntries(req.headers.entries()),
  }) || "unknown"; // Get user IP
  const currentTime = Date.now();

  // Retrieve existing attempts
  const userAttempts = rateLimitMap.get(ip) || { count: 0, lastAttempt: 0 };

  // Reset if window time has passed
  if (currentTime - userAttempts.lastAttempt > WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, lastAttempt: currentTime });
  } else {
    userAttempts.count += 1;
    userAttempts.lastAttempt = currentTime;

    if (userAttempts.count > MAX_ATTEMPTS) {
      return NextResponse.json(
        { error: "Too many requests. Try again later." },
        { status: 429 }
      );
    }

    rateLimitMap.set(ip, userAttempts);
  }

  return NextResponse.json({ message: "Request successful!" }, { status: 200 });
}
