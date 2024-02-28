type ToastType = 'info' | 'success' | 'warning' | 'error' | 'default';

export interface NotifierPayload {
  type: string;
  payload: any;
}
export interface ToastPayload {
  type: ToastType;
  message: string;
}
