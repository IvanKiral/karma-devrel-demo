import { type NextRequest, NextResponse } from "next/server";
import { buildLogoutUrl } from "@/lib/auth0/flows.ts";
import { getSession } from "@/lib/auth0/session.ts";
import { getRequestOrigin } from "@/lib/requestOrigin.ts";

export async function GET(req: NextRequest) {
  const session = await getSession();
  session.destroy();
  await session.save();
  return NextResponse.redirect(await buildLogoutUrl(getRequestOrigin(req)));
}
