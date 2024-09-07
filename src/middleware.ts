import { NextRequest } from 'next/server'
import createIntlMiddleware from 'next-intl/middleware'

import { defaultLocale, locales } from './constants/locale'

export async function middleware(request: NextRequest) {
  const handleI18nRouting = createIntlMiddleware({
    locales,
    defaultLocale,
    localePrefix: 'as-needed',
  })
  const response = handleI18nRouting(request)
  return response
}

export const config = {
  matcher: [
    '/((?!api|_next|messages|images|fonts|manifest|serviceworker|favicon.ico|robots.txt).*)',
    '/',
  ],
}
