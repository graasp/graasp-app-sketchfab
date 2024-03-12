import { AppSetting } from '@graasp/sdk';

import { APP_SETTING_NAMES } from '../../src/config/settings';
import { SKETCHFAB_MODEL_ID } from './model';
import { MOCK_APP_ITEM } from './item';

export const APP_SETTINGS: AppSetting[] = [
  {
    id: 'showModel-id',
    name: APP_SETTING_NAMES.SHOW_MODEL,
    data: { [APP_SETTING_NAMES.SHOW_MODEL]: false },
    createdAt: '2020-01-01T01:01:01Z',
    updatedAt: '2020-01-01T01:01:01Z',
    item: MOCK_APP_ITEM,
  },
  {
    id: 'showQrCode-id',
    name: APP_SETTING_NAMES.SHOW_QR_CODE,
    data: { [APP_SETTING_NAMES.SHOW_QR_CODE]: false },
    createdAt: '2020-02-01T01:01:01Z',
    updatedAt: '2020-02-01T01:01:01Z',
    item: MOCK_APP_ITEM,
  },
];

export const MODEL_SETTING = {
  name: APP_SETTING_NAMES.MODEL,
  data: { model: SKETCHFAB_MODEL_ID },
  id: 'model-id',
  createdAt: '2020-03-01T01:01:01Z',
  updatedAt: '2020-03-01T01:01:01Z',
  item: MOCK_APP_ITEM,
};
