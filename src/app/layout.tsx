import '@/app/globals.css'

import type { ReactNode } from 'react'

import { Toaster } from '@/components'
import { fontRoboto } from '@/configs/font'
import { cn } from '@/utils'

type Props = Readonly<{
  children: ReactNode
}>

const RootLayout = ({ children }: Props) => {
  return (
    <html lang="en">
      <body className={cn('antialiased', fontRoboto.className)}>
        {children}
        <Toaster richColors position="top-center" closeButton />
      </body>
    </html>
  )
}

export default RootLayout
