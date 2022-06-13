import { APP_SETTING_NAMES } from '../../src/config/settings';
import { SKETCHFAB_MODEL_ID } from './model';

export const APP_SETTINGS = [
  {
    id: 'showModel-id',
    name: APP_SETTING_NAMES.SHOW_MODEL,
    data: { [APP_SETTING_NAMES.SHOW_MODEL]: false },
  },
  {
    id: 'showQrCode-id',
    name: APP_SETTING_NAMES.SHOW_QR_CODE,
    data: { [APP_SETTING_NAMES.SHOW_QR_CODE]: false },
  },
];

export const MODEL_SETTING = {
  name: APP_SETTING_NAMES.MODEL,
  data: { model: SKETCHFAB_MODEL_ID },
  id: 'model-id',
};
