'use client';
import { useEffect, useRef } from 'react';
import { registerXAlert } from './register-x-alert';
import type { AlertType } from './x-alert';

type Props = {
  message?: string;
  type?: AlertType;
  open?: boolean;
  onClose?: (e: CustomEvent<{ closedAt: number }>) => void;
  children?: React.ReactNode;
};

export function XAlertReact({
  message = '',
  type = 'info',
  open = false,
  onClose,
  children,
}: Props) {
  const elRef = useRef<HTMLElement>(null);

  useEffect(() => {
    registerXAlert();
  }, []);

  useEffect(() => {
    const el = elRef.current as any;
    if (!el) return;

    if (typeof el.setMessage === 'function') el.setMessage(message);
    else el.setAttribute('message', message);

    if (typeof el.setType === 'function') el.setType(type);
    else el.setAttribute('type', type);

    if (typeof el.setOpen === 'function') el.setOpen(open);
    else if (open) el.setAttribute('open', '');
    else el.removeAttribute('open');

    const handler = (e: Event) => onClose?.(e as CustomEvent);
    el.addEventListener('x-close', handler);
    return () => el.removeEventListener('x-close', handler);
  }, [message, type, open, onClose]);

  return <x-alert ref={elRef}>{children}</x-alert>;
}
