import { buildDatabase } from '@graasp/apps-query-client';
import {
  AppItemType,
  Context,
  ItemType,
  Member,
  PermissionLevel,
} from '@graasp/sdk';

const MOCK_ITEM: AppItemType = {
  id: 'item-id',
  path: 'item_id',
  name: 'my item',
  type: ItemType.APP,
  extra: {
    [ItemType.APP]: {
      url: 'some url',
    },
  },
  description: '',
  creator: {} as unknown as Member,
  settings: {},
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const MOCK_CONTEXT = {
  permission: PermissionLevel.Admin,
  memberId: 'memberid',
  itemId: MOCK_ITEM.id,
  context: Context.Builder,
  apiHost: process.env.REACT_APP_API_HOST,
};

export const MOCK_DB = buildDatabase({
  items: [MOCK_ITEM],
});
