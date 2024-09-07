import '@/app/globals.css'

import { NextIntlClientProvider, useMessages } from 'next-intl'
import { ReactNode } from 'react'

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
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

export default RootLayout
