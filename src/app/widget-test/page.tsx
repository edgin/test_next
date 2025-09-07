// src/app/demo/page.tsx
'use client';
import { useEffect } from 'react';

export default function Demo() {
  useEffect(() => {
    import('../../components/widget_test');
  }, []);
  return (
    <x-demo-widget-test value="Ahoj">
      <span slot="header">🚢 Header</span>I am default content
      <small slot="footer">mini footer</small>
    </x-demo-widget-test>
  );
}
