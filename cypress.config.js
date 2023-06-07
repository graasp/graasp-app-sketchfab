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
    REACT_APP_API_HOST: 'http://localhost:3000',
    REACT_APP_ENABLE_MOCK_API: 'true',
    REACT_APP_GRAASP_APP_KEY: 'my-key',
    REACT_APP_VERSION: process.env.REACT_APP_VERSION,
  },
});
