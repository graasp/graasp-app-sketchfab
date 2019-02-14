import Qs from 'qs';
import {
  GET_MODELS_SUCCEEDED,
  GET_MODELS_FAILED,
  FLAG_GETTING_MODELS,
} from '../types';
import { DEFAULT_GET_REQUEST, MODELS_ENDPOINT } from '../config/api';
import { flag, isErrorResponse } from './common';

const flagGettingModels = flag(FLAG_GETTING_MODELS);

const getModels = async queryParams => async dispatch => {
  dispatch(flagGettingModels(true));
  try {
    const queryString = Qs.stringify({
      ...queryParams,
      type: 'models',
    });
    const url = `${MODELS_ENDPOINT}?${queryString}`;

    const response = await fetch(url, {
      ...DEFAULT_GET_REQUEST,
      credentials: undefined,
    });

    // throws if it is an error
    await isErrorResponse(response);

    const models = response.json();
    dispatch({
      type: GET_MODELS_SUCCEEDED,
      payload: models,
    });
  } catch (err) {
    dispatch({
      type: GET_MODELS_FAILED,
      payload: err,
    });
  } finally {
    dispatch(flagGettingModels(false));
  }
};

export {
  // eslint-disable-next-line
  getModels,
};
