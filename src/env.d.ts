/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly SITE_LANGUAGE: string;
  readonly SITE_NAME: string;
  readonly SITE_DESCRIPTION: string;
  readonly PUBLIC_ALGOLIA_APP_ID: string;
  readonly PUBLIC_ALGOLIA_SEARCH_KEY: string;
  readonly PUBLIC_ALGOLIA_SEARCH_INDEX: string;
  readonly ALGOLIA_ADMIN_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
