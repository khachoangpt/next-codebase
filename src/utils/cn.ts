import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combines the provided class values using clsx and then merges them using tailwind-merge.
 *
 * @param {ClassValue[]} inputs - Array of class values to be combined.
 * @return {string} The merged class names.
 */
export const cn = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(inputs))
}
