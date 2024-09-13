import type {
  ResponseCookie,
  ResponseCookies,
} from 'next/dist/compiled/@edge-runtime/cookies'
import { cookies } from 'next/headers'

import { COOKIES } from '@/constants'

/**
 * A function that retrieves a cookie value of type T based on the cookie name.
 *
 * @param {COOKIES} name - The name of the cookie to retrieve.
 * @return {T} The value of the cookie as type T.
 */
const get = <T>(name: COOKIES): T => {
  const cookie = cookies().get(name)?.value
  return cookie as T
}

/**
 * Sets a cookie with the given name, value, and optional configurations.
 *
 * @param {CookieSetType} options - The options for setting the cookie.
 * @param {COOKIES} options.name - The name of the cookie.
 * @param {string} options.value - The value of the cookie.
 * @param {Partial<ResponseCookie>} [options.configs] - Optional configurations for the cookie.
 * @return {ResponseCookie} The set cookie.
 */
const set = ({ name, value, configs = {} }: CookieSetType): ResponseCookies => {
  return cookies().set(name, value, { ...defaultConfig, ...configs })
}

/**
 * Removes a cookie with the specified name.
 *
 * @param {COOKIES} name - The name of the cookie to remove.
 * @param {Partial<ResponseCookie>} [configs] - Optional configurations for the cookie.
 * @return {ResponseCookies} The deleted cookie.
 */
const remove = (
  name: COOKIES,
  configs?: Partial<ResponseCookie>,
): ResponseCookies => {
  return cookies().delete({ name, ...configs })
}

/**
 * Clears all cookies.
 */
const clear = () => {
  const keys = Object.values(COOKIES)
  for (const key of keys) {
    cookies().delete(key)
  }
}

export const Cookies = {
  get,
  set,
  remove,
  clear,
}

type CookieSetType = {
  name: COOKIES
  value: string
  configs?: Partial<ResponseCookie>
}

const defaultConfig: Partial<ResponseCookie> = {
  path: '/',
  maxAge: undefined,
}
