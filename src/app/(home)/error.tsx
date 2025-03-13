"use client";

import { useEffect } from "react";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Error fetching products: ", error);
    return () => {
      reset();
    };
  }, [error, reset]);

  return (
    <div>
      <h1>❗️</h1>
      <p>There is an error</p>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
