'use client';
import { useEffect } from 'react';

export default function DemoPage() {
  useEffect(() => {
    import('../../components/widget');
  }, []); // side-effect define on client

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        alert('Submitted: ' + JSON.stringify(Object.fromEntries(fd)));
      }}
    >
      <x-demo-widget
        name="demo"
        mode="success"
        count={3}
        value="hello"
        open
        style={{ display: 'block', margin: 12 }}
      >
        <span slot="header">🚢 Demo Header</span>
        Default slotted content
        <small slot="footer">Footer slot — themable</small>
      </x-demo-widget>

      <button type="submit">Submit form</button>
    </form>
  );
}
