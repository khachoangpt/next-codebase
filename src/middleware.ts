import { type NextRequest, NextResponse } from 'next/server'

import { pageList } from './configs/routes'
import { COOKIES } from './constants'
import { findRouteByPathname } from './utils'

export async function middleware(request: NextRequest) {
	const url = request.nextUrl
	const cookies = request.cookies
	const jwt = cookies.get(COOKIES.JWT)?.value
	const isMaintenance = process.env.NEXT_PUBLIC_MAINTENANCE_MODE
	const response = NextResponse.next()
	// check route is exist
	const routeFound = findRouteByPathname(url.pathname)

	if (!routeFound) {
		return response
	}
	// check route is auth and customer not logged in
	if (!jwt && routeFound.isAuth) {
		const redirectUrl = new URL(pageList.login.href, request.url)
		return NextResponse.redirect(redirectUrl)
	}
	// access to login page while logged in
	if (jwt && routeFound.href === pageList.login.href) {
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
		'/((?!api|_next|images|fonts|manifest|serviceworker|favicon.ico|robots.txt).*)',
		'/',
	],
}
