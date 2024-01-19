/// <reference types="@remix-run/node/globals" />
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TURNSTILE_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare global {
  namespace NodeJS {
    // noinspection JSUnusedGlobalSymbols
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      RR_DB_HOST: string;
      RR_DB_PORT: number;
      RR_DB_USER: string;
      RR_DB_PASSWORD: string;
      RR_DB_DATABASE: string;
      RR_TURNSTILE_SECRET: string;
    }
  }
}
