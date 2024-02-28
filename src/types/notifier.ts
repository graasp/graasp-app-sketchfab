import { Notifier } from '@graasp/apps-query-client';

type ToastType = 'info' | 'success' | 'warning' | 'error' | 'default';

type ErrorPayload = Parameters<Notifier>[0]['payload'] & {
  failure?: unknown[];
};

type SuccessPayload = {
  message?: string;
};

type Payload = ErrorPayload & SuccessPayload;

export interface NotifierPayload {
  type: string;
  payload?: Payload;
}
export interface ToastPayload {
  type: ToastType;
  message: string;
}
