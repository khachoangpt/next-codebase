import { type StaticPageMeta, pageList, pathList } from '@/configs/routes'

export const findRouteByPathname = (
	fullPath: string,
): StaticPageMeta | undefined => {
	const routeArray = fullPath.split('/').slice(1)

	if (JSON.stringify(routeArray) === JSON.stringify(pageList.home.pattern)) {
		return pageList.home
	}

	const meta = pathList.find((pageMeta) => {
		const meta = typeof pageMeta === 'function' ? pageMeta({}) : pageMeta
		const routeRegex = createRegexFromRoute(meta.pattern)
		return (
			routeArray.length === meta.pattern.length && routeRegex.test(fullPath)
		)
	})
	if (typeof meta === 'function') {
		return meta({})
	}

	return meta
}

/**
 * Creates a regular expression pattern from route pattern.
 *
 * @param {string[]} routeArray - The array of route elements.
 * @return {RegExp} The regular expression pattern.
 */
const createRegexFromRoute = (routeArray: string[]): RegExp => {
	let regex = ''
	for (const element of routeArray) {
		if (element !== '') {
			regex += `\/${element}`
		} else {
			regex += '/.+'
		}
	}
	return new RegExp(regex)
}
