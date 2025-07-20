// Environment Variables Configuration
export const env = {
  // API Configuration
  BASE_URL: import.meta.env.VITE_BASE_URL || 'http://localhost:3000',
  BASE_URL_API:
    import.meta.env.VITE_BASE_URL_API || 'http://localhost:3000/api/v1',

  // Environment
  NODE_ENV: import.meta.env.MODE || 'development',
  DEV: import.meta.env.DEV,
  PROD: import.meta.env.PROD,
} as const

// Type definitions for better TypeScript support
export type EnvConfig = typeof env

// Helper function to get API URL with endpoint
export const getApiUrl = (endpoint: string = '') => {
  const baseUrl = env.BASE_URL_API
  return endpoint
    ? `${baseUrl}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`
    : baseUrl
}

// Development helpers
if (env.DEV) {
  console.log('🌍 Environment Variables Loaded:', {
    NODE_ENV: env.NODE_ENV,
    BASE_URL: env.BASE_URL,
    BASE_URL_API: env.BASE_URL_API,
  })
}
