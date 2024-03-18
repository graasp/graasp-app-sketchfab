export const DEFAULT_QUERY = 'education';

export const APP_SETTING_NAMES = {
  SHOW_QR_CODE: 'showQrCode',
  SHOW_MODEL: 'showModel',
  MODEL: 'model',
} as const;

export const MODEL_SEARCH_ENDPOINT = 'https://api.sketchfab.com/v3/search';
export const MODEL_INFO_ENDPOINT = 'https://api.sketchfab.com/v3/models/';

export const DEFAULT_SHOW_QR_CODE = true;
export const DEFAULT_SHOW_MODEL = true;

// todo: use from graasp constants
export const PERMISSION_LEVELS = {
  WRITE: 'write',
  READ: 'read',
  ADMIN: 'admin',
};
export const DEFAULT_PERMISSION = PERMISSION_LEVELS.READ;

export const CONTEXTS = {
  BUILDER: 'builder',
  PLAYER: 'player',
  ANALYZER: 'analyzer',
};

export const SKETCHFAB_VERSION = '1.4.2';
