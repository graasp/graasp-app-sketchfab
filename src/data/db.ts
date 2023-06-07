import { Context, PermissionLevel } from '@graasp/sdk';

export const MOCK_CONTEXT = {
  permission: PermissionLevel.Admin,
  memberId: 'memberid',
  context: Context.Builder,
  apiHost: process.env.REACT_APP_API_HOST,
};
