import {
  TOGGLE_SHOW_QR_CODE_SUCCEEDED,
  TOGGLE_SHOW_QR_CODE_FAILED,
  FLAG_TOGGLING_SHOW_QR_CODE,
  TOGGLE_SHOW_MODEL_SUCCEEDED,
  TOGGLE_SHOW_MODEL_FAILED,
  FLAG_TOGGLING_SHOW_MODEL,
} from '../types';

const INITIAL_STATE = {
  activity: [],
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case FLAG_TOGGLING_SHOW_MODEL:
    case FLAG_TOGGLING_SHOW_QR_CODE:
      // on true flag we add one element
      if (payload) {
        return {
          ...state,
          activity: [...state.activity, true],
        };
      }
      // on false flag we remove one element
      return {
        ...state,
        activity: [...state.activity].slice(1),
      };

    case TOGGLE_SHOW_QR_CODE_SUCCEEDED:
    case TOGGLE_SHOW_QR_CODE_FAILED:
    case TOGGLE_SHOW_MODEL_SUCCEEDED:
    case TOGGLE_SHOW_MODEL_FAILED:
    default:
      return state;
  }
};
