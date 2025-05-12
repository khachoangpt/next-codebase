import { cn } from '@/utils'
import './globals.css'
import { NotoSansJP } from '@/configs/fonts'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'

type RootLayoutProps = Readonly<{ children: ReactNode }>

export const metadata: Metadata = {
	title: 'Website title',
	description: 'Website description',
}

const RootLayout = ({ children }: RootLayoutProps) => {
	return (
		<html lang="ja">
			<body className={cn('antialiased', NotoSansJP.className)}>
				{children}
			</body>
		</html>
	)
}

export default RootLayout
