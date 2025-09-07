// src/app/demo/page.tsx
'use client';
import { useEffect } from 'react';

export default function Demo() {
  useEffect(() => {
    import('../../components/widget_test');
  }, []);
  return <x-demo-widget-test value="hi" open />;
}
