import { getIronSession } from "iron-session/edge";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const middleware = async (req: NextRequest) => {
  const res = NextResponse.next();
  const session = await getIronSession(req, res, {
    cookieName: "egov3_auth",
    password: process.env.SECRET!,
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  });

  const { user } = session;

  if (user) {
    return res;
  }

  return NextResponse.redirect(`${process.env.VERCEL_URL}/sign-in`);
};

export const config = {
  matcher: "/",
};
