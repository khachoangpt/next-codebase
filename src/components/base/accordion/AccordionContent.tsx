'use client'

import * as AccordionPrimitive from '@radix-ui/react-accordion'
import type { VariantProps } from 'class-variance-authority'
import type { ComponentPropsWithoutRef, ElementRef } from 'react'
import { forwardRef } from 'react'

import { cn } from '@/utils'

import { Container } from '../container'
import { accordionContentVariants } from './variants'

type Props = ComponentPropsWithoutRef<typeof AccordionPrimitive.Content> &
  VariantProps<typeof accordionContentVariants>

export const AccordionContent = forwardRef<
  ElementRef<typeof AccordionPrimitive.Content>,
  Props
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(accordionContentVariants({ className }))}
    {...props}
  >
    <Container>{children}</Container>
  </AccordionPrimitive.Content>
))

AccordionContent.displayName = AccordionPrimitive.Content.displayName
