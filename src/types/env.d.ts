/// <reference types="vite/client" />

// Environment variables type definitions for Vite
declare interface ImportMetaEnv {
  // API Configuration
  readonly VITE_BASE_URL?: string
  readonly VITE_BASE_URL_API?: string

  // Firebase Configuration
  readonly VITE_FIREBASE_API_KEY?: string
  readonly VITE_FIREBASE_AUTH_DOMAIN?: string
  readonly VITE_FIREBASE_PROJECT_ID?: string
  readonly VITE_FIREBASE_STORAGE_BUCKET?: string
  readonly VITE_FIREBASE_MESSAGING_SENDER_ID?: string
  readonly VITE_FIREBASE_APP_ID?: string
  readonly VITE_FIREBASE_MEASUREMENT_ID?: string
}

declare interface ImportMeta {
  readonly env: ImportMetaEnv
}
