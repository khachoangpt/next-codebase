import type { ChangeEventHandler, HTMLInputTypeAttribute } from 'react'

import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Text,
  useFormField,
} from '@/components/base'
import { cn } from '@/utils'

type Props = {
  label?: string
  placeholder?: string
  className?: string
  description?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
  value?: string
  disabled?: boolean
  type?: HTMLInputTypeAttribute
  required?: boolean
}

export const FormInput = ({
  label = '',
  placeholder,
  className,
  description,
  onChange,
  value,
  disabled = false,
  type = 'text',
  required = false,
}: Props) => {
  const { error } = useFormField()

  return (
    <FormItem>
      <FormLabel>
        {label}
        {required && <Text className="text-error">*</Text>}
      </FormLabel>
      <FormControl>
        <Input
          data-error={!!error}
          placeholder={placeholder ?? label}
          className={cn('data-[error=true]:border-error', className)}
          onChange={onChange}
          value={value}
          disabled={disabled}
          type={type}
          autoComplete="off"
        />
      </FormControl>
      {!!description && <FormDescription>{description}</FormDescription>}
      <FormMessage />
    </FormItem>
  )
}
