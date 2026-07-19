"use client";

import { useEffect, useState } from "react";

export function useCustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("cursor-pointer")
      ) {
        setHovered(true);
        const dataText = target.getAttribute("data-cursor-text") || 
                         target.closest("[data-cursor-text]")?.getAttribute("data-cursor-text");
        if (dataText) {
          setText(dataText);
        } else {
          setText("");
        }
      } else {
        setHovered(false);
        setText("");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return { position, hovered, text };
}
