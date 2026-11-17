import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const LOGIN_PATH = "/admin/login";

function isAdminPath(pathname: string) {
  return pathname === "/admin" || pathname.startsWith("/admin/");
}

function redirectTo(
  request: NextRequest,
  response: NextResponse,
  pathname: string,
) {
  const url = request.nextUrl.clone();
  url.pathname = pathname;
  url.search = "";

  const redirectResponse = NextResponse.redirect(url);

  response.cookies.getAll().forEach((cookie) => {
    redirectResponse.cookies.set(cookie);
  });

  return redirectResponse;
}

export async function updateSession(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const pathname = request.nextUrl.pathname;
  const protectsAdmin = isAdminPath(pathname) && pathname !== LOGIN_PATH;

  if (!supabaseUrl || !supabaseAnonKey) {
    const response = NextResponse.next({ request });

    return protectsAdmin ? redirectTo(request, response, LOGIN_PATH) : response;
  }

  let response = NextResponse.next({ request });

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet, headers) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value),
        );

        response = NextResponse.next({ request });

        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );

        Object.entries(headers).forEach(([key, value]) =>
          response.headers.set(key, value),
        );
      },
    },
  });

  const { data } = await supabase.auth.getClaims();

  if (protectsAdmin) {
    if (!data) {
      return redirectTo(request, response, LOGIN_PATH);
    }

    const { data: isAdmin, error } = await supabase.rpc("is_admin");

    if (error || isAdmin !== true) {
      return redirectTo(request, response, LOGIN_PATH);
    }
  }

  if (pathname === LOGIN_PATH && data) {
    const { data: isAdmin } = await supabase.rpc("is_admin");

    if (isAdmin === true) {
      return redirectTo(request, response, "/admin");
    }
  }

  return response;
}
