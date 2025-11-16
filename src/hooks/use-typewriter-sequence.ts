"use client";

import { useState, useCallback, useEffect } from 'react';

type Message = {
  id: number | string;
  text: string;
};

export function useTypewriterSequence(messages: Message[]) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // Start the sequence automatically on mount.
    if (messages.length > 0) {
      setCurrentMessageIndex(1);
    }
  }, [messages.length]);

  const handleCurrentMessageComplete = useCallback(() => {
    if (currentMessageIndex < messages.length) {
      // Reveal the next message by incrementing the index.
      setCurrentMessageIndex((prevIndex) => prevIndex + 1);
    } else {
      // All messages have been displayed. Show the button.
      setShowButton(true);
    }
  }, [currentMessageIndex, messages.length]);

  // Declaratively determine which messages to display based on the current index.
  const messagesToDisplay = messages.slice(0, currentMessageIndex);

  return {
    messagesToDisplay,
    showButton,
    handleCurrentMessageComplete,
  };
}
