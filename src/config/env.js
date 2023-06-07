export const {
  REACT_APP_GRAASP_APP_KEY,
  REACT_APP_VERSION,
  REACT_APP_GOOGLE_ANALYTICS_ID,
} = window.Cypress ? Cypress.env() : process.env;
