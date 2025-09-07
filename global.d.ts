// global.d.ts
import type React from 'react';

type WCProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;

// 1) Global JSX augmentation (classic path)
declare global {
  namespace JSX {
    interface IntrinsicElements {
      // ---- cards / demos
      'my-card-noslot': WCProps;
      'my-card-slot': WCProps;
      'my-card-slot-2': WCProps;

      // ---- alert
      'x-alert': WCProps & {
        open?: boolean;
        type?: 'info' | 'success' | 'warning' | 'error';
        message?: string;
      };

      // ---- throttle
      'ship-throttle': WCProps & {
        power?: number;
      };

      // ---- widgets
      'x-demo-widget': WCProps & {
        open?: boolean;
        count?: number;
        mode?: 'info' | 'success' | 'warning' | 'error';
        value?: string;
        name?: string;
      };

      'x-demo-widget-test': WCProps & {
        open?: boolean;
        value?: string;
      };
    }
  }
}

// 2) React JSX runtime augmentation (ensures merge in TS 5 setups)
declare module 'react' {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      // mirror the same keys so both namespaces merge
      'my-card-noslot': WCProps;
      'my-card-slot': WCProps;
      'my-card-slot-2': WCProps;

      'x-alert': WCProps & {
        open?: boolean;
        type?: 'info' | 'success' | 'warning' | 'error';
        message?: string;
      };

      'ship-throttle': WCProps & { power?: number };

      'x-demo-widget': WCProps & {
        open?: boolean;
        count?: number;
        mode?: 'info' | 'success' | 'warning' | 'error';
        value?: string;
        name?: string;
      };

      'x-demo-widget-test': WCProps & { open?: boolean; value?: string };
    }
  }
}

export {};
