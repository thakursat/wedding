import { useEffect, useState } from "react";

/**
 * Tracks the viewport size so animated confetti can render responsively.
 */
export const useWindowSize = () => {
  const isClient = typeof window !== "undefined";

  const [size, setSize] = useState({
    width: isClient ? window.innerWidth : 0,
    height: isClient ? window.innerHeight : 0,
  });

  useEffect(() => {
    if (!isClient) return undefined;

    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isClient]);

  return size;
};
