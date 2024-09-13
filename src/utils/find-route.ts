import type { LOCALE, StaticPageMeta } from '@/constants'
import { defaultLocale, locales, pageList, pathList } from '@/constants'

/**
 * Asynchronously finds a route by pathname.
 *
 * @param {string} fullPath - The full path to search for a route.
 * @param {LOCALE} locale - The locale to search for a route.
 * @return {Promise<StaticPageMeta | undefined>} The static page meta information or undefined.
 */
export const findRouteByPathname = async (
  fullPath: string,
  locale: LOCALE,
): Promise<StaticPageMeta | undefined> => {
  const routeArray = fullPath.split('/').slice(1)
  if (
    locale &&
    locale !== defaultLocale &&
    locales.includes(routeArray[0] as LOCALE)
  ) {
    routeArray.shift()
    if (routeArray.length === 0) {
      routeArray.push('')
    }
  }
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
