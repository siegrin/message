"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { cn } from '@/lib/utils';

const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';

const Cursor = () => (
    <span className="relative -bottom-0.5 sm:-bottom-1 inline-block w-[0.5em] h-[1.2em] bg-primary animate-blink ml-1" aria-hidden="true" />
);

export function Typewriter({
  text,
  speed = 50,
  scrambleDuration = 100,
  scrambleSpeed = 30,
  className,
  onComplete,
}: {
  text: string;
  speed?: number;
  scrambleDuration?: number;
  scrambleSpeed?: number;
  className?: string;
  onComplete?: () => void;
}) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const isMounted = useRef(true);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleTyping = useCallback(async () => {
    if (!isMounted.current) return;
    setIsTyping(true);
    
    // Start with a clean slate only if it's a new text
    setDisplayedText('');

    for (let i = 0; i < text.length; i++) {
      if (!isMounted.current) return;
      
      const char = text[i];
      if (char === ' ') {
        setDisplayedText(prev => prev + ' ');
        await new Promise(resolve => setTimeout(resolve, speed));
        continue;
      }

      const scrambleStartTime = Date.now();
      while (Date.now() - scrambleStartTime < scrambleDuration) {
        if (!isMounted.current) return;
        const randomChar = randomChars[Math.floor(Math.random() * randomChars.length)];
        setDisplayedText(text.substring(0, i) + randomChar);
        await new Promise(resolve => setTimeout(resolve, scrambleSpeed));
      }
      
      if (isMounted.current) {
        setDisplayedText(text.substring(0, i + 1));
      }
      await new Promise(resolve => setTimeout(resolve, speed));
    }
    
    if (isMounted.current) {
        setIsTyping(false);
        onCompleteRef.current?.();
    }
  }, [text, speed, scrambleDuration, scrambleSpeed]);

  useEffect(() => {
    handleTyping();
  }, [handleTyping]);

  return (
    <div className={cn("inline-block font-code", className)}>
      <span>{displayedText}</span>
      {isTyping && <Cursor />}
    </div>
  );
}
