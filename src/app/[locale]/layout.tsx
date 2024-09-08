import '@/app/globals.css'

import { NextIntlClientProvider, useMessages } from 'next-intl'
import type { ReactNode } from 'react'

import { Toaster } from '@/components'

type Props = Readonly<{
  children: ReactNode
  params: { locale: string }
}>

const RootLayout = ({ children, params: { locale } }: Props) => {
  const messages = useMessages()

  return (
    <html lang={locale}>
      <body className="antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
          <Toaster richColors position="top-center" closeButton />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

export default RootLayout
