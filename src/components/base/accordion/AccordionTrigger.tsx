'use client'

import * as AccordionPrimitive from '@radix-ui/react-accordion'
import type { VariantProps } from 'class-variance-authority'
import type { ComponentPropsWithoutRef, ElementRef, ReactElement } from 'react'
import { forwardRef } from 'react'

import { cn } from '@/utils'

import { accordionTriggerVariants } from './variants'

type Props = ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> &
  VariantProps<typeof accordionTriggerVariants> & {
    dropdownIcon?: ReactElement
  }

export const AccordionTrigger = forwardRef<
  ElementRef<typeof AccordionPrimitive.Trigger>,
  Props
>(({ className, children, dropdownIcon, ...props }, ref) => {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(accordionTriggerVariants({ className }))}
        {...props}
      >
        {children}
        {dropdownIcon}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
})

AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName
