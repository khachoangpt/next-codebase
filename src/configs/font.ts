import type { NextFont } from 'next/dist/compiled/@next/font'
import { Inter, Roboto } from 'next/font/google'

import { LOCALE } from '@/constants'

const fontRoboto = Roboto({
  subsets: ['latin'],
  display: 'swap',
  weight: ['100', '300', '400', '500', '700', '900'],
})

const fontInter = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: ['100', '300', '400', '500', '700', '900'],
})

/**
 * Returns the appropriate font based on the provided locale.
 *
 * @param {LOCALE} locale - The locale to determine the font for.
 * @return {NextFont} The font object corresponding to the locale.
 */
export const getFont = (locale: LOCALE): NextFont => {
  switch (locale) {
    case LOCALE.vietnamese:
      return fontInter
    default:
      return fontRoboto
  }
}
