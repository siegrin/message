
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Typewriter } from '@/components/typewriter';
import { useTypewriterSequence } from "@/hooks/use-typewriter-sequence";

const initialMessages = [
  {
    id: 1,
    text: "hellow!",
  },
  {
    id: 2,
    text: "This is the day!",
  },
];

export default function StartPage() {
    const { messagesToDisplay, showButton, handleCurrentMessageComplete } = useTypewriterSequence(initialMessages);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-background transition-colors duration-500">
      <div className="w-full max-w-md md:max-w-2xl">
        <div className="space-y-4 flex flex-col p-4 md:p-6 min-h-[160px]">
          {messagesToDisplay.map((msg, index) => (
             <div key={msg.id}>
                <Typewriter
                  text={msg.text}
                  onComplete={index === messagesToDisplay.length - 1 ? handleCurrentMessageComplete : undefined}
                  className="text-2xl md:text-3xl font-headline text-primary"
                />
              </div>
          ))}
        </div>
        <div className="flex justify-center p-6 pt-4 h-14">
            {showButton && (
                <Link href="/evaluate" passHref>
                <Button
                    size="lg"
                    className="font-body text-base md:text-lg transition-all duration-700 bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg transform hover:scale-105 animate-in fade-in"
                >
                    Next
                </Button>
                </Link>
            )}
        </div>
      </div>
    </main>
  );
}
