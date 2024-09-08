import { cva } from 'class-variance-authority'

export const inputVariants = cva(
  'flex h-10 w-full rounded-md border border-input bg-base px-3 py-2 text-sm ring-offset-base file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50',
)
