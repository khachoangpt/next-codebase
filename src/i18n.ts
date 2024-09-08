import { createSharedPathnamesNavigation } from 'next-intl/navigation'
import { getRequestConfig } from 'next-intl/server'

import { locales } from '@/constants'

export default getRequestConfig(async ({ locale }) => ({
  messages: { ...(await import(`#/messages/${locale}/common.json`)).default },
}))

export const { usePathname, Link, useRouter } = createSharedPathnamesNavigation(
  {
    locales,
  },
)
