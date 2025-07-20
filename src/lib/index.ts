// Common third-party library configurations and wrappers
// This folder is for configuring external libraries used across the app

export const cn = (
  ...classes: (string | undefined | null | false)[]
): string => {
  return classes.filter(Boolean).join(' ')
}

// Example: Axios instance configuration (if using axios instead of fetch)
// export const httpClient = axios.create({
//   baseURL: env.BASE_URL_API,
//   timeout: 10000,
// })

// Example: Date formatting utilities
export const formatters = {
  currency: (amount: number, currency = 'VND') =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency }).format(
      amount
    ),

  date: (date: Date | string) =>
    new Intl.DateTimeFormat('vi-VN').format(new Date(date)),

  number: (num: number) => new Intl.NumberFormat('vi-VN').format(num),
}
