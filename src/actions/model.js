import {
  FLAG_SELECTING_MODEL,
  SELECT_MODEL_SUCCEEDED,
  SELECT_MODEL_FAILED,
} from '../types';
import { flag, getSettings } from './common';
import { patchAppInstance } from './appInstance';

const flagSelectingModel = flag(FLAG_SELECTING_MODEL);

const selectModel = async data => async (dispatch, getState) => {
  dispatch(flagSelectingModel(true));
  try {
    const {
      data: { model },
    } = data;

    const currentSettings = getSettings(getState);
    const newSettings = {
      ...currentSettings,
      model,
    };
    await dispatch(patchAppInstance({ data: newSettings }));

    dispatch({
      type: SELECT_MODEL_SUCCEEDED,
      payload: model,
    });
  } catch (err) {
    dispatch({
      type: SELECT_MODEL_FAILED,
      payload: err,
    });
  } finally {
    dispatch(flagSelectingModel(false));
  }
};

export {
  // eslint-disable-next-line
  selectModel,
};
