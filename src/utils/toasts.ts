import { toast } from 'react-toastify';

import {
  FAILED_TO_FETCH_MESSAGE_PRETTY,
  FAILED_TO_FETCH_MESSAGE_RAW,
  UNEXPECTED_ERROR_MESSAGE,
} from '../constants/messages';
import { ToastPayload } from '../types/notifier';

const showToast = ({ type, message }: ToastPayload): void => {
  toast(message, {
    type,
    toastId: message,
  });
};

const showErrorToast = (payload: string | { message: string }): void => {
  let message = UNEXPECTED_ERROR_MESSAGE;
  if (payload instanceof String || typeof payload === 'string') {
    message = payload as string;
  } else if (payload instanceof Object) {
    if (payload.message) {
      ({ message } = payload);
    }
  }
  // provide more context
  if (message === FAILED_TO_FETCH_MESSAGE_RAW) {
    message = FAILED_TO_FETCH_MESSAGE_PRETTY;
  }

  toast.error(message, {
    toastId: message,
    autoClose: false,
  });
};

export { showErrorToast, showToast };
