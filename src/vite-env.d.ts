/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string
  readonly VITE_AUTH_API: string
  readonly VITE_SERVICE_API: string
  readonly VITE_BOOKING_API: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
