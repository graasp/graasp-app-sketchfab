import {
  FLAG_TOGGLING_SHOW_QR_CODE,
  TOGGLE_SHOW_QR_CODE_SUCCEEDED,
  TOGGLE_SHOW_QR_CODE_FAILED,
  FLAG_TOGGLING_SHOW_MODEL,
  TOGGLE_SHOW_MODEL_SUCCEEDED,
  TOGGLE_SHOW_MODEL_FAILED,
} from '../types';
import { flag, getSettings } from './common';
import { patchAppInstance } from './appInstance';

const flagTogglingShowQrCode = flag(FLAG_TOGGLING_SHOW_QR_CODE);
const flagTogglingShowModel = flag(FLAG_TOGGLING_SHOW_MODEL);

const toggleShowQrCode = async showQrCode => async (dispatch, getState) => {
  dispatch(flagTogglingShowQrCode(true));
  try {
    const currentSettings = getSettings(getState);

    const newSettings = {
      ...currentSettings,
      showQrCode,
    };

    await dispatch(patchAppInstance({ data: newSettings }));

    dispatch({
      type: TOGGLE_SHOW_QR_CODE_SUCCEEDED,
    });
  } catch (err) {
    dispatch({
      type: TOGGLE_SHOW_QR_CODE_FAILED,
      payload: err,
    });
  } finally {
    dispatch(flagTogglingShowQrCode(false));
  }
};

const toggleShowModel = async showModel => async (dispatch, getState) => {
  dispatch(flagTogglingShowModel(true));
  try {
    const currentSettings = getSettings(getState);

    const newSettings = {
      ...currentSettings,
      showModel,
    };

    await dispatch(patchAppInstance({ data: newSettings }));

    dispatch({
      type: TOGGLE_SHOW_MODEL_SUCCEEDED,
    });
  } catch (err) {
    dispatch({
      type: TOGGLE_SHOW_MODEL_FAILED,
      payload: err,
    });
  } finally {
    dispatch(flagTogglingShowModel(false));
  }
};

export { toggleShowModel, toggleShowQrCode };
