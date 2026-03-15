import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { APP_TOAST_EVENT, showToast, type ToastPayload } from '@/lib/toast';

type ToastItem = ToastPayload & { id: number };

type ToastContextValue = {
  pushToast: (toast: ToastPayload) => void;
};

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const pushToast = useCallback((toast: ToastPayload) => {
    const id = Date.now() + Math.floor(Math.random() * 1000);
    setToasts((prev) => [...prev, { ...toast, id }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((item) => item.id !== id));
    }, 4000);
  }, []);

  useEffect(() => {
    const handleToast = (event: Event) => {
      const customEvent = event as CustomEvent<ToastPayload>;
      if (!customEvent.detail?.message) {
        return;
      }

      pushToast(customEvent.detail);
    };

    window.addEventListener(APP_TOAST_EVENT, handleToast as EventListener);
    return () => window.removeEventListener(APP_TOAST_EVENT, handleToast as EventListener);
  }, [pushToast]);

  const contextValue = useMemo(() => ({ pushToast }), [pushToast]);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <div className="fixed top-4 right-4 z-[100] flex w-full max-w-sm flex-col gap-2 px-4 sm:px-0">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`rounded-xl border px-4 py-3 text-sm font-semibold shadow-lg backdrop-blur ${
              toast.type === 'success'
                ? 'border-green-200 bg-green-50 text-green-700'
                : toast.type === 'info'
                ? 'border-blue-200 bg-blue-50 text-blue-700'
                : 'border-red-200 bg-red-50 text-red-700'
            }`}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }

  return {
    pushToast: context.pushToast,
    showError: (message: string) => showToast({ type: 'error', message }),
    showSuccess: (message: string) => showToast({ type: 'success', message }),
    showInfo: (message: string) => showToast({ type: 'info', message }),
  };
}
