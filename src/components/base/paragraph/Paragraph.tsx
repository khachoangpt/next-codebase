'use client'

import type { VariantProps } from 'class-variance-authority'
import type { PropsWithRef } from 'react'

import { cn } from '@/utils'

import { paragraphVariants } from './variants'

type Props = PropsWithRef<JSX.IntrinsicElements['p']> &
  VariantProps<typeof paragraphVariants>

export const Paragraph = ({ className, ...props }: Props) => {
  return <p className={cn(paragraphVariants({ className }))} {...props} />
}
