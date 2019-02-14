import {
  FLAG_GETTING_MODELS,
  GET_MODELS_FAILED,
  GET_MODELS_SUCCEEDED,
} from '../types';
import { showErrorToast } from '../utils/toasts';

const INITIAL_STATE = {
  content: {
    results: [],
  },
  activity: false,
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case FLAG_GETTING_MODELS:
      return {
        ...state,
        activity: payload,
      };
    case GET_MODELS_SUCCEEDED:
      return {
        ...state,
        content: payload,
      };
    case GET_MODELS_FAILED:
      // show error to user
      showErrorToast(payload);
      return state;
    default:
      return state;
  }
};
