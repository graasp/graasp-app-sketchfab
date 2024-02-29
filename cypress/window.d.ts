declare global {
  interface Window {
    appContext: Partial<LocalContext>;
    Cypress: boolean;
    database: Partial<Database>;
    apiErrors: object;
  }
}

export {};
