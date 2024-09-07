import { forwardRef, type HTMLAttributes } from 'react'

export const Container = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ children, ...rest }, ref) => (
  <div ref={ref} {...rest}>
    {children}
  </div>
))

Container.displayName = 'Container'
