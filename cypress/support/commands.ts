import { Database, LocalContext } from '@graasp/apps-query-client';
import { Member } from '@graasp/sdk';

import { MOCK_SERVER_ITEM } from '../fixtures/item';
import { CURRENT_MEMBER, MEMBERS } from '../fixtures/members';

Cypress.Commands.add(
  'setUpApi',
  ({
    currentMember = CURRENT_MEMBER,
    database,
    appContext,
  }: {
    currentMember?: Member;
    database?: Database;
    appContext?: LocalContext;
  } = {}) => {
    // mock api and database
    Cypress.on('window:before:load', (win) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      win.database = {
        appData: [],
        appActions: [],
        appSettings: [],
        members: Object.values(MEMBERS),
        items: [MOCK_SERVER_ITEM],
        ...(database ?? {}),
      };
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      win.appContext = {
        memberId: currentMember.id,
        itemId: MOCK_SERVER_ITEM.id,
        apiHost: Cypress.env('REACT_APP_API_HOST') || 'http://localhost:3000',
        ...appContext,
      };
    });
  }
);
