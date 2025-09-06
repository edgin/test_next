import { XAlert } from './x-alert';

export function registerXAlert() {
  if (typeof window === 'undefined') return; // SSR guard
  if (!customElements.get('x-alert')) {
    customElements.define('x-alert', XAlert);
  }
}
