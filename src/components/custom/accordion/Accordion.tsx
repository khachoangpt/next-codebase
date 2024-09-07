'use client'

import type * as AccordionPrimitive from '@radix-ui/react-accordion'
import { ChevronDown } from 'lucide-react'
import type { ComponentPropsWithoutRef, ElementRef, ReactElement } from 'react'
import { forwardRef } from 'react'

import {
  AccordionBase,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/base'
import type { AccordionItemType } from '@/components/types'
import { cn } from '@/utils'

type Props = ComponentPropsWithoutRef<typeof AccordionPrimitive.Root> & {
  items: AccordionItemType[]
  dropdownIcon?: ReactElement
  dropDownIconClassName?: string
}

export const Accordion = forwardRef<
  ElementRef<typeof AccordionPrimitive.Root>,
  Props
>(({ items = [], dropdownIcon, dropDownIconClassName, ...props }, ref) => {
  const icon = dropdownIcon ?? (
    <ChevronDown
      className={cn(
        'transition-all duration-200 group-data-[state=open]:rotate-180',
        dropDownIconClassName,
      )}
    />
  )

  return (
    <AccordionBase ref={ref} {...props}>
      {items.map(({ title, content }) => (
        <AccordionItem value={title} key={title}>
          <AccordionTrigger dropdownIcon={icon}>{title}</AccordionTrigger>
          <AccordionContent>{content}</AccordionContent>
        </AccordionItem>
      ))}
    </AccordionBase>
  )
})

Accordion.displayName = 'Accordion'
