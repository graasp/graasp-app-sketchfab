import { toast } from 'react-toastify';

import { ROUTINES } from '@graasp/apps-query-client';

import i18n from './i18n';
import { APP_SETTING_NAMES } from './settings';
import { NotifierPayload } from '../types/notifier';

const { postAppSettingRoutine, patchAppSettingRoutine } = ROUTINES;

const notifier = ({ type, payload }: NotifierPayload): void => {
  let message = null;
  switch (type) {
    // error messages
    case postAppSettingRoutine.FAILURE:
    case patchAppSettingRoutine.FAILURE: {
      if (payload?.error) {
        message = i18n.t(payload?.error?.message);
      } else {
        message = i18n.t('An unexpected error occured');
      }
      break;
    }
    // success messages
    case postAppSettingRoutine.SUCCESS:
    case patchAppSettingRoutine.SUCCESS: {
      if (payload?.name === APP_SETTING_NAMES.MODEL) {
        message = i18n.t('The model was successfully selected');
      } else {
        message = i18n.t('The setting was successfully modified');
      }
      break;
    }
    default:
      break;
  }
  // error notification
  if (payload?.error && message) {
    toast.error(i18n.t(message));
  }
  // success notification
  else if (message) {
    toast.success(i18n.t(message));
  }
};

export default notifier;
