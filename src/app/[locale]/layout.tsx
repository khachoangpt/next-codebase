import '@/app/globals.css'

import { NextIntlClientProvider, useMessages } from 'next-intl'
import type { ReactNode } from 'react'

import { Toaster } from '@/components'
import { getFont } from '@/configs/font'
import type { LOCALE } from '@/constants'
import { cn } from '@/utils'

type Props = Readonly<{
  children: ReactNode
  params: { locale: LOCALE }
}>

const RootLayout = ({ children, params: { locale } }: Props) => {
  const messages = useMessages()
  const font = getFont(locale)

  return (
    <html lang={locale}>
      <body className={cn('antialiased', font.className)}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
          <Toaster richColors position="top-center" closeButton />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

export default RootLayout
