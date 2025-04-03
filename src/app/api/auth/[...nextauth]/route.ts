import { handlers } from "@/app/_lib/Auth";
import { NextRequest } from "next/server";
export const { GET, POST } = handlers;
// Protect against unauthorized API access
export async function middleware(req: NextRequest) {
  if (req.method !== "GET" && req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (!req.headers.get("user-agent") || req.headers.get("user-agent")?.includes("curl")) {
    return new Response(JSON.stringify({ error: "Unauthorized request" }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }
}
