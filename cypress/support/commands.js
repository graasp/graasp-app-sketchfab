import { buildDatabase } from '@graasp/apps-query-client';

import { MEMBERS } from '../fixtures/members';

Cypress.Commands.add('setUpApi', ({ database = {}, appContext } = {}) => {
  // mock api and database
  Cypress.on('window:before:load', (win) => {
    win.database = buildDatabase({
      members: Object.values(MEMBERS),
      ...database,
    });
    win.appContext = appContext;
  });
});
