import { defineConfig } from 'cypress';

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // eslint-disable-next-line  @typescript-eslint/no-var-requires
      require('@cypress/code-coverage/task')(on, config);
      // include any other plugin code...

      // It's IMPORTANT to return the config object
      // with any changed environment variables
      return config;
    },
    baseUrl: 'http://localhost:3333',
  },
  env: {
    VITE_GRAASP_API_HOST: 'http://localhost:3000',
    VITE_ENABLE_MOCK_API: 'true',
    VITE_GRAASP_APP_KEY: 'my-key',
    VITE_VERSION: process.env.VITE_VERSION,
  },
});
