import { Slot } from '@radix-ui/react-slot'
import type { VariantProps } from 'class-variance-authority'
import { Loader2Icon } from 'lucide-react'
import { type ButtonHTMLAttributes, forwardRef } from 'react'

import { cn } from '@/utils'

import { Text } from '../text'
import { buttonVariants } from './variants'

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, asChild = false, loading, disabled, children, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ className }))}
        disabled={loading || disabled}
        ref={ref}
        {...props}
      >
        <Text
          data-loading={loading}
          className={cn('data-[loading=true]:opacity-0')}
        >
          {children}
        </Text>
        {loading && <Loader2Icon className="absolute h-4 w-4 animate-spin" />}
      </Comp>
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
