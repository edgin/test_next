'use client';
import { useState } from 'react';
import { XAlertReact } from '../../components/XAlertReact';

export default function Page() {
  const [open, setOpen] = useState(true);
  const [type, setType] = useState<'info' | 'warning' | 'error'>('error');

  return (
    <main style={{ padding: 24, display: 'grid', gap: 12 }}>
      <h1>Custom Element in React + TS</h1>

      <XAlertReact
        message="Network error"
        type={type}
        open={open}
        onClose={(e) => {
          console.log('Closed at', e.detail.closedAt);
          setOpen(false);
        }}
      >
        <div slot="extra" style={{ marginLeft: 8 }}>
          <button onClick={() => setOpen(false)}>Hide</button>
        </div>
      </XAlertReact>

      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={() => setOpen(true)}>Open</button>
        <button onClick={() => setType('info')}>Info</button>
        <button onClick={() => setType('warning')}>Warning</button>
        <button onClick={() => setType('error')}>Error</button>
      </div>
    </main>
  );
}
