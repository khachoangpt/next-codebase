import { cva } from 'class-variance-authority'

export const buttonVariants = cva(
  'relative inline-flex items-center justify-center whitespace-nowrap rounded-sm active:rounded-sm after:rounded-sm after:hover:rounded-sm text-sm font-medium ring-offset-base transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 after:inset-0 after:absolute',
  {
    variants: {},
    defaultVariants: {},
  },
)
