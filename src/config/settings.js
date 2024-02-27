export const DEFAULT_QUERY = 'education';

export const APP_SETTING_NAMES = {
  SHOW_QR_CODE: 'showQrCode',
  SHOW_MODEL: 'showModel',
  MODEL: 'model',
};

export const ENABLE_MOCK_API =
  process.env.REACT_APP_ENABLE_MOCK_API === 'true' ?? false;

export const MODELS_ENDPOINT = 'https://api.sketchfab.com/v3/search';
export const MODEL_ENDPOINT = 'https://api.sketchfab.com/v3/models/';
// used for mock api
export const MODEL_MOCK_ENDPOINT =
  'https://api.sketchfab.com/v3/models/4cca6f5de07a4823b70b42c020cfd9b5';
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
