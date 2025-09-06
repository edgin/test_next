// types/custom-elements.d.ts
import React from "react";

type WebComponentProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
>;

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "my-card-noslot": WebComponentProps;
      "my-card-slot": WebComponentProps;
      "my-card-slot-2": WebComponentProps; // ← add your new tag here
    }
  }
}
export {};
