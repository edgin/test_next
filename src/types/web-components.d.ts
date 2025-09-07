// src/types/custom-elements.d.ts
import type React from 'react';

// Base HTML props any custom element should accept in JSX
type WCProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;

declare global {
  namespace JSX {
    interface IntrinsicElements {
      // your demo elements
      'my-card-noslot': WCProps;
      'my-card-slot': WCProps;
      'my-card-slot-2': WCProps;

      // explicit attrs for each custom element (no class imports!)
      'x-alert': WCProps & {
        open?: boolean;
        type?: 'info' | 'success' | 'warning' | 'error';
        message?: string;
      };

      'ship-throttle': WCProps & {
        power?: number;
      };
      'x-demo-widget': WCProps & {
        open?: boolean;
        count?: number;
        mode?: 'info' | 'success' | 'warning' | 'error';
        value?: string;
        name?: string;
      };
      'x-demo-widget-test': WCProps & {
        open?: boolean;
        count?: number;
        mode?: 'info' | 'success' | 'warning' | 'error';
        value?: string;
        name?: string;
      };
    }
  }
}

export {}; // keep this so TS treats the file as a module
