export const {
  REACT_APP_GRAASP_APP_KEY,
  REACT_APP_VERSION,
  REACT_APP_GOOGLE_ANALYTICS_ID,
  REACT_APP_API_HOST,
  REACT_APP_ENABLE_MOCK_API,
} = window.Cypress ? Cypress.env() : process.env;