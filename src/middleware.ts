import { type NextRequest, NextResponse } from 'next/server'
import createIntlMiddleware from 'next-intl/middleware'

import type { LOCALE } from './constants'
import { COOKIES, defaultLocale, locales, pageList } from './constants'
import { findRouteByPathname } from './utils'

export async function middleware(request: NextRequest) {
  const url = request.nextUrl
  const cookies = request.cookies
  const locale = (cookies.get(COOKIES.NEXT_LOCALE)?.value ??
    defaultLocale) as LOCALE
  const accessToken = cookies.get(COOKIES.ACCESS_TOKEN)?.value
  const isMaintenance = process.env.NEXT_PUBLIC_MAINTENANCE_MODE
  const handleI18nRouting = createIntlMiddleware({
    locales,
    defaultLocale,
    localePrefix: 'as-needed',
  })
  const response = handleI18nRouting(request)

  // check route is exist
  const routeFound = await findRouteByPathname(url.pathname, locale)
  if (!routeFound) {
    return response
  }
  // check route is auth and customer not logged in
  if (!accessToken && routeFound.isAuth) {
    const redirectUrl = new URL(pageList.login.href, request.url)
    return NextResponse.redirect(redirectUrl)
  }
  // access to login page while logged in
  if (accessToken && routeFound.href === pageList.login.href) {
    const redirectUrl = new URL(pageList.home.href, request.url)
    return NextResponse.redirect(redirectUrl)
  }
  if (isMaintenance === 'true' && url.pathname !== pageList.maintenance.href) {
    // maintenance mode is on
    const redirectUrl = new URL(pageList.maintenance.href, request.url)
    return NextResponse.redirect(redirectUrl)
  }
  // access to maintenance page while maintenance mode is off
  if (isMaintenance !== 'true' && url.pathname === pageList.maintenance.href) {
    const redirectUrl = new URL(pageList.home.href, request.url)
    return NextResponse.redirect(redirectUrl)
  }

  return response
}

export const config = {
  matcher: [
    '/((?!api|_next|messages|images|fonts|manifest|serviceworker|favicon.ico|robots.txt).*)',
    '/',
  ],
}
