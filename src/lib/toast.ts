export const APP_TOAST_EVENT = 'app:toast';

export type ToastPayload = {
  type?: 'error' | 'success' | 'info';
  message: string;
};

export function showToast(payload: ToastPayload) {
  if (typeof window === 'undefined') {
    return;
  }

  window.dispatchEvent(new CustomEvent<ToastPayload>(APP_TOAST_EVENT, { detail: payload }));
}

export function showErrorToast(message: string) {
  showToast({ type: 'error', message });
}
