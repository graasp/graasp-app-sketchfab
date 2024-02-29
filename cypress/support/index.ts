import { Database, LocalContext } from '@graasp/apps-query-client';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      setUpApi(value?: {
        database?: Partial<Database>;
        appContext?: Partial<LocalContext>;
      }): Chainable<JQuery<HTMLElement>>;
    }
  }
}

export {};
