
'use client';

import { useEffect, useState } from 'react';

export default function GoodbyePage() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Clear session storage on this final page to reset the flow
    sessionStorage.removeItem('visited-cake');
    sessionStorage.removeItem('visited-letter');
    sessionStorage.removeItem('visited-gift');
    
    const timer = setTimeout(() => {
      setShow(true);
    }, 500); // short delay for the fade-in effect

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-black transition-opacity duration-1000">
      <div
        className={`transition-opacity duration-1000 ease-in-out ${
          show ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <h1 className="text-3xl md:text-5xl font-headline text-white text-center">
          Good luck on your new journey!
        </h1>
      </div>
    </main>
  );
}
