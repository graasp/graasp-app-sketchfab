import { MEMBERS } from '../fixtures/members';

Cypress.Commands.add('setUpApi', ({ database = {}, appContext } = {}) => {
  // mock api and database
  Cypress.on('window:before:load', (win) => {
    win.database = {
      appData: [],
      appActions: [],
      appSettings: [],
      members: Object.values(MEMBERS),
      ...database,
    };
    win.appContext = appContext;
  });
});
