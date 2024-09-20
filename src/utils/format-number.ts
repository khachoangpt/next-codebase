/**
 * Format a number by inserting commas as thousand separators.
 *
 * @example
 * formatNumber(1000) // '1,000'
 * formatNumber(123456) // '123,456'
 * formatNumber(1234567890) // '1,234,567,890'
 *
 * @param {number | string} num - The number to format.
 * @returns {string} The formatted number.
 */
export const formatNumber = (num: number | string): string => {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}
