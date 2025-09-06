// types/custom-elements.d.ts
import React from 'react';
import type { XAlert } from '../components/x-alert';

type WebComponentProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;

type CustomElement<T> = Partial<T & DOMAttributes<HTMLElement> & { children?: any }>;

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'my-card-noslot': WebComponentProps;
      'my-card-slot': WebComponentProps;
      'my-card-slot-2': WebComponentProps; // ← add your new tag here
      'x-alert': CustomElement<XAlert>;
    }
  }
}
export {};
