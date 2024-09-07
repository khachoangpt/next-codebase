import './globals.css'

import { ReactNode } from 'react'

type Props = Readonly<{
  children: ReactNode
}>

const RootLayout = ({ children }: Props) => {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}

export default RootLayout
