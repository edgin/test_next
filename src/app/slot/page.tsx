
"use client";

import { useEffect } from "react";

// --- JSX typing for this file only ---
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "my-card-slot": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}
export {};

export default function Slot() {
  useEffect(() => {
    // <my-card-noslot> — has shadow DOM, but no <slot>, so light DOM is NOT displayed
    if (!customElements.get("my-card-noslot")) {
      class MyCardNoSlot extends HTMLElement {
        constructor() {
          super();
          const shadow = this.attachShadow({ mode: "open" });
          shadow.innerHTML = `
            <style>
              .box { border: 2px solid crimson; padding: 8px; margin-bottom: 12px; }
              .title { font-weight: 700; }
            </style>
            <div class="box">
              <div class="title">my-card-noslot (Shadow DOM)</div>
              <p>Only shadow content is visible here.</p>
            </div>
          `;
        }
      }
      customElements.define("my-card-noslot", MyCardNoSlot);
    }

    // <my-card-slot> — has <slot>, so light DOM is projected into the shadow layout
    if (!customElements.get("my-card-slot")) {
      class MyCardSlot extends HTMLElement {
        constructor() {
          super();
          const shadow = this.attachShadow({ mode: "open" });
          shadow.innerHTML = `
            <style>
              .box { border: 2px solid seagreen; padding: 8px; }
              .title { font-weight: 700; margin-bottom: 6px; }
              .light-label { font-size: 12px; opacity: 0.7; }
            </style>
            <div class="box">
              <div class="title">my-card-slot (Shadow DOM)</div>
              <div class="light-label">Below is light DOM projected via &lt;slot&gt;:</div>
              <div>
                <slot></slot>
              </div>
            </div>
          `;
        }
      }
      customElements.define("my-card-slot", MyCardSlot);
    }
    
     // <my-card-slot> — has <slot>, so light DOM is projected into the shadow layout
    if (!customElements.get("my-card-slot-2")) {
      class MyCardSlot2 extends HTMLElement {
        constructor() {
          super();
          const shadow = this.attachShadow({ mode: "open" });
          shadow.innerHTML = `
            <style>.box { border:2px solid seagreen; padding:6px; }</style>
            <div class="box">
              <header><slot name="title"></slot></header>
              <section><slot></slot></section>
              <footer><slot name="footer"></slot></footer>
            </div>
          `;
        }
      }
      customElements.define("my-card-slot-2", MyCardSlot2);
    }
  }, []);

  return (
    <main style={{ padding: 16, fontFamily: "system-ui, Segoe UI, sans-serif" }}>

      <section style={{ marginTop: 16 }}>
        <my-card-noslot>
          <h3 style={{ color: "purple" }}>I am LIGHT DOM content (won't be shown)</h3>
        </my-card-noslot>
    
      </section>

      <section style={{ marginTop: 24 }}>
        <my-card-slot>
          <strong style={{ color: "rebeccapurple" }}>
            I am LIGHT DOM content (projected through &lt;slot&gt;)
          </strong>
        </my-card-slot>
      </section>

      <section style={{ marginTop: 24 }}>
        <my-card-slot-2>
          <span slot="title" style={{ color: "teal", fontWeight: "bold" }}>I am in the title slot</span>
          <p>I am in the default slot</p>
          <small slot="footer" style={{ color: "gray" }}>I am in the footer slot</small>
        </my-card-slot-2>
       

      </section>
    </main>
  );
}
