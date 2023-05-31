import { Database, LocalContext } from '@graasp/apps-query-client';

import { MEMBERS } from '../fixtures/members';

Cypress.Commands.add(
  'setUpApi',
  ({
    database,
    appContext,
  }: { database?: Database; appContext?: LocalContext } = {}) => {
    // mock api and database
    Cypress.on('window:before:load', (win) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      win.database = {
        appData: [],
        appActions: [],
        appSettings: [],
        members: Object.values(MEMBERS),
        ...(database ?? {}),
      };
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      win.appContext = appContext;
    });
  }
);
