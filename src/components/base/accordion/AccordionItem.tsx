'use client'

import * as AccordionPrimitive from '@radix-ui/react-accordion'
import type { VariantProps } from 'class-variance-authority'
import type { ComponentPropsWithoutRef, ElementRef } from 'react'
import { forwardRef } from 'react'

import { cn } from '@/utils'

import { accordionItemVariants } from './variants'

type Props = ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> &
  VariantProps<typeof accordionItemVariants>

export const AccordionItem = forwardRef<
  ElementRef<typeof AccordionPrimitive.Item>,
  Props
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(accordionItemVariants({ className }))}
    {...props}
  />
))

AccordionItem.displayName = 'AccordionItem'
