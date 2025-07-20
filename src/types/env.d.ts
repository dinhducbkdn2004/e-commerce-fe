/// <reference types="vite/client" />

// Environment variables type definitions for Vite
declare interface ImportMetaEnv {
  // API Configuration
  readonly VITE_BASE_URL?: string
  readonly VITE_BASE_URL_API?: string

  // Add other environment variables as needed
}

declare interface ImportMeta {
  readonly env: ImportMetaEnv
}
