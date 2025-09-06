"use client";

import styles from "./Button.module.css";
import React, { useState, useEffect} from "react";

type ButtonProps = {
  label: string;
};

export default function Button({ label }: ButtonProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(`Button clicked ${count} times`);
  }, [count]);

  return (
    <button
      onClick={() => setCount(count + 1)}
      className={`${styles.btn} bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded`}
    >
      {label}
    </button>
  );
}
