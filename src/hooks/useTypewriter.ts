/**
 * Custom hook for typewriter text animation effect
 * Supports configurable speed, delay, and looping
 */

"use client";

import { useState, useEffect, useCallback } from "react";

interface UseTypewriterOptions {
  text: string;
  speed?: number;
  delay?: number;
  loop?: boolean;
  loopDelay?: number;
}

export function useTypewriter({
  text,
  speed = 100,
  delay = 0,
  loop = false,
  loopDelay = 2000,
}: UseTypewriterOptions) {
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const startTyping = useCallback(() => {
    setIsTyping(true);
    setIsComplete(false);
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let charIndex = 0;

    const typeNextChar = () => {
      if (charIndex < text.length) {
        setDisplayText(text.slice(0, charIndex + 1));
        charIndex++;
        timeout = setTimeout(typeNextChar, speed);
      } else {
        setIsComplete(true);
        setIsTyping(false);

        if (loop) {
          timeout = setTimeout(() => {
            setDisplayText("");
            charIndex = 0;
            setIsTyping(true);
            timeout = setTimeout(typeNextChar, speed);
          }, loopDelay);
        }
      }
    };

    if (isTyping) {
      timeout = setTimeout(typeNextChar, delay);
    }

    return () => clearTimeout(timeout);
  }, [text, speed, delay, loop, loopDelay, isTyping]);

  return { displayText, isTyping, isComplete, startTyping };
}
