import { LOCAL_API_HOST } from './api';

export const DEFAULT_LANG = 'en';
export const DEFAULT_MODE = null;
export const DEFAULT_API_HOST =
  window.parent.location.hostname === 'localhost' ? LOCAL_API_HOST : null;

export const DEFAULT_QUERY = 'education';

export const APP_SETTING_NAMES = {
  SHOW_QR_CODE: 'showQrCode',
  SHOW_MODEL: 'showModel',
  MODEL: 'model',
};

export const ENABLE_MOCK_API =
  process.env.REACT_APP_ENABLE_MOCK_API === 'true' ?? false;

export const MODELS_ENDPOINT = 'https://api.sketchfab.com/v3/search';

export const DEFAULT_SHOW_QR_CODE = true;
export const DEFAULT_SHOW_MODEL = true;
