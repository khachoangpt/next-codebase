import { cva } from 'class-variance-authority'

export const accordionItemVariants = cva('border-b', {
  variants: {},
  defaultVariants: {},
})

export const accordionTriggerVariants = cva(
  'group flex flex-1 items-center justify-between py-4 font-medium',
  {
    variants: {},
    defaultVariants: {},
  },
)

export const accordionContentVariants = cva(
  'overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
  {
    variants: {},
    defaultVariants: {},
  },
)
