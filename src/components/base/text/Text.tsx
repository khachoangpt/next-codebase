'use client'

import type { VariantProps } from 'class-variance-authority'
import type { PropsWithRef } from 'react'

import { cn } from '@/utils'

import { textVariants } from './variants'

type Props = PropsWithRef<JSX.IntrinsicElements['span']> &
  VariantProps<typeof textVariants>

export const Text = ({ className, ...props }: Props) => {
  return <span className={cn(textVariants({ className }))} {...props} />
}
