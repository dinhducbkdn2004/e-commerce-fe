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

  // Firebase Configuration
  FIREBASE: {
    API_KEY: import.meta.env.VITE_FIREBASE_API_KEY,
    AUTH_DOMAIN: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    PROJECT_ID: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    STORAGE_BUCKET: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    MESSAGING_SENDER_ID: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    APP_ID: import.meta.env.VITE_FIREBASE_APP_ID,
    MEASUREMENT_ID: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  },
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

// Helper function to validate required environment variables
export const validateEnv = () => {
  const requiredVars = {
    VITE_BASE_URL: env.BASE_URL,
    VITE_BASE_URL_API: env.BASE_URL_API,
    VITE_FIREBASE_API_KEY: env.FIREBASE.API_KEY,
    VITE_FIREBASE_AUTH_DOMAIN: env.FIREBASE.AUTH_DOMAIN,
    VITE_FIREBASE_PROJECT_ID: env.FIREBASE.PROJECT_ID,
  }

  const missingVars = Object.entries(requiredVars)
    .filter(([, value]) => !value)
    .map(([key]) => key)

  if (missingVars.length > 0) {
    console.error('❌ Missing required environment variables:', missingVars)
    throw new Error(
      `Missing required environment variables: ${missingVars.join(', ')}`
    )
  }

  console.log('✅ All required environment variables are loaded')
  return true
}

// Firebase configuration object for initialization
export const firebaseConfig = {
  apiKey: env.FIREBASE.API_KEY,
  authDomain: env.FIREBASE.AUTH_DOMAIN,
  projectId: env.FIREBASE.PROJECT_ID,
  storageBucket: env.FIREBASE.STORAGE_BUCKET,
  messagingSenderId: env.FIREBASE.MESSAGING_SENDER_ID,
  appId: env.FIREBASE.APP_ID,
  measurementId: env.FIREBASE.MEASUREMENT_ID,
}

// Development helpers
if (env.DEV) {
  console.log('🌍 Environment Variables Loaded:', {
    NODE_ENV: env.NODE_ENV,
    BASE_URL: env.BASE_URL,
    BASE_URL_API: env.BASE_URL_API,
    FIREBASE_PROJECT_ID: env.FIREBASE.PROJECT_ID,
  })
}
