/// <reference types="vite/client" />
/// <reference types="@remix-run/node" />

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
      BUILD_ENV: 'vercel' | undefined;
      RX_DB_HOST: string;
      RX_DB_PORT: number;
      RX_DB_USER: string;
      RX_DB_PASSWORD: string;
      RX_DB_DATABASE: string;
      RX_COOKIE_SECRET: string;
      RX_TURNSTILE_SECRET: string;
    }
  }
}
