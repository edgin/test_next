// src/probe.ts
type _Probe1 = JSX.IntrinsicElements['x-demo-widget']; // should NOT error
type _Probe2 = JSX.IntrinsicElements['x-demo-widget-test']; // should NOT error
