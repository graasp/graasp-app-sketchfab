import { toast } from 'react-toastify';
import {
  SELECT_MODEL_FAILED,
  SELECT_MODEL_SUCCEEDED,
  FLAG_SELECTING_MODEL,
} from '../types';
import { showErrorToast, showToast } from '../utils/toasts';
import { SELECTED_MODEL_MESSAGE } from '../constants/messages';

const INITIAL_STATE = {
  content: null,
  activity: false,
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case FLAG_SELECTING_MODEL:
      return {
        ...state,
        activity: false,
      };

    case SELECT_MODEL_SUCCEEDED:
      showToast({
        type: toast.TYPE.SUCCESS,
        message: SELECTED_MODEL_MESSAGE,
      });
      return {
        ...state,
        content: payload,
      };

    case SELECT_MODEL_FAILED:
      // show error to user
      showErrorToast(payload);
      return state;

    default:
      return state;
  }
};
