import { Database, LocalContext } from '@graasp/apps-query-client';
import {
  AppItemType,
  CompleteMember,
  Context,
  ItemType,
  MemberType,
  PermissionLevel,
} from '@graasp/sdk';

import { REACT_APP_API_HOST } from '../config/env';

export const MOCK_ITEM_ID = '1234-1234-123456-8123-123456';

export const MOCK_CONTEXT: LocalContext = {
  apiHost: REACT_APP_API_HOST,
  permission: PermissionLevel.Admin,
  context: Context.Builder,
  itemId: MOCK_ITEM_ID,
  memberId: 'mock-member-id',
};

export const mockMembers: CompleteMember[] = [
  {
    id: MOCK_CONTEXT.memberId || '',
    name: 'current-member',
    email: 'current@graasp.org',
    extra: {},
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    type: MemberType.Individual,
  },
  {
    id: 'mock-member-id-2',
    name: 'mock-member-2',
    email: 'other-member@graasp.org',
    extra: {},
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    type: MemberType.Individual,
  },
];

const mockItem: AppItemType = {
  id: MOCK_CONTEXT.itemId,
  path: 'mock_item',
  name: 'item-name',
  description: '',
  creator: mockMembers[0],
  settings: {},
  extra: {
    [ItemType.APP]: {
      url: 'myurl',
    },
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  type: ItemType.APP,
};

export const buildDatabase = (members?: CompleteMember[]): Database => ({
  appData: [],
  appActions: [],
  members: members ?? mockMembers,
  appSettings: [],
  items: [mockItem],
});
