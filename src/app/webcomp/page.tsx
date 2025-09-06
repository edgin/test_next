"use client"; // Needed if you're using Next.js 13+ app router with React hooks

import { useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";

const App = ({ text, color }: { text: string; color: string }) => (
  <p style={{ color }}>{text}</p>
);

export default function Page() {
  const shadowHostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!shadowHostRef.current) return;

    // Create Shadow DOM
    const shadowRoot = shadowHostRef.current.attachShadow({ mode: "open" });

    // Create a mount point inside shadow DOM
    const mountPoint = document.createElement("span");
    shadowRoot.appendChild(mountPoint);

    // Render React into Shadow DOM
    const shadowRootReact = ReactDOM.createRoot(mountPoint);
    shadowRootReact.render(<App text="Hello from Shadow DOM" color="blue" />);
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      {/* Regular DOM */}
      <div>
        <h2>Regular DOM</h2>
        <App text="Hello from Regular DOM" color="red" />
      </div>

      {/* Shadow DOM */}
      <div>
        <h2>Shadow DOM</h2>
        <div ref={shadowHostRef} />
      </div>
    </div>
  );
}
