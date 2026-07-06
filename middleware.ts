import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('adminToken')?.value;

  // Protect all /admindp routes
  if (request.nextUrl.pathname.startsWith('/admindp')) {
    if (!token) {
      // Redirect unauthenticated users to the dedicated login page
      return NextResponse.redirect(new URL('/admin-login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admindp/:path*'],
};
