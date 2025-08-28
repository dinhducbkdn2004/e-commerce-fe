/**
 * Format number to Vietnamese currency format
 * @param amount - The amount to format
 * @param showSymbol - Whether to show the ₫ symbol (default: true)
 * @returns Formatted currency string
 */
export function formatCurrency(
  amount: number,
  showSymbol: boolean = true
): string {
  const formatted = amount.toLocaleString('vi-VN')
  return showSymbol ? `${formatted}₫` : formatted
}

/**
 * Parse currency string back to number
 * @param currencyString - The currency string to parse
 * @returns Parsed number
 */
export function parseCurrency(currencyString: string): number {
  return parseInt(currencyString.replace(/[₫,\s]/g, '')) || 0
}

/**
 * Format price range for display
 * @param minPrice - Minimum price
 * @param maxPrice - Maximum price
 * @returns Formatted price range string
 */
export function formatPriceRange(minPrice?: number, maxPrice?: number): string {
  if (!minPrice && !maxPrice) return ''
  if (!minPrice) return `Dưới ${formatCurrency(maxPrice!)}`
  if (!maxPrice) return `Từ ${formatCurrency(minPrice)}`
  return `${formatCurrency(minPrice)} - ${formatCurrency(maxPrice)}`
}

