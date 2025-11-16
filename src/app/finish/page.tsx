
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

export default function FinishPage() {
  const [isPreparingLaunch, setIsPreparingLaunch] = useState(false);
  const [isTakingOff, setIsTakingOff] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isLaunched, setIsLaunched] = useState(false);
  const [hasLanded, setHasLanded] = useState(false);

  useEffect(() => {
    // Empty useEffect to prevent errors, logic is now CSS-driven
  }, []);

  const handleLaunch = () => {
    setIsPreparingLaunch(true);
    setCountdown(3);

    const countdownInterval = setInterval(() => {
      setCountdown((prev) => (prev !== null ? prev - 1 : null));
    }, 1000);

    setTimeout(() => {
      clearInterval(countdownInterval);
      setCountdown(null);
      setIsTakingOff(true);
    }, 3500);

    setTimeout(() => {
      setIsLaunched(true);
      setIsTakingOff(false);
    }, 5000);

    setTimeout(() => {
      setHasLanded(true);
    }, 10000); 
  };

  return (
    <main
      className={cn(
        "flex flex-col items-center justify-center min-h-screen p-4 bg-black transition-all duration-[3000ms] overflow-hidden relative"
      )}
    >
      <div className="static-stars" />
      <div className="star-field" data-animating={isLaunched && !hasLanded}>
          <div className="layer"></div>
          <div className="layer"></div>
          <div className="layer"></div>
      </div>

      <div className="w-full h-full flex items-center justify-center relative z-10">
        {!isPreparingLaunch && !isLaunched && !hasLanded && (
          <Button
            size="lg"
            onClick={handleLaunch}
            className="font-body z-20 text-base md:text-lg bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg transform hover:scale-105 transition-transform"
          >
            Launch! 🚀
          </Button>
        )}

        {isPreparingLaunch && countdown !== null && countdown > 0 && (
          <div className="text-7xl font-bold z-20 font-headline text-primary animate-in fade-in zoom-in-50">
            {countdown}
          </div>
        )}
        {isPreparingLaunch && countdown === 0 && (
          <div className="text-7xl font-bold z-20 font-headline text-primary animate-in fade-in zoom-in-50">
            LIFT OFF!
          </div>
        )}
        
        {hasLanded && (
          <div className="absolute top-[25%] left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4 animate-in fade-in-0 duration-500">
             <p className="text-xl md:text-2xl font-headline text-primary text-center">
              Sudah Mendarat! 🌕
            </p>
            <Link href="/birthday" passHref>
              <Button
                size="lg"
                className="font-body text-base md:text-lg bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg transform hover:scale-105 transition-transform"
              >
                Keluar dari roket 🧑‍🚀
              </Button>
            </Link>
          </div>
        )}

        <div
          className={cn(
            "absolute left-1/2 -translate-x-1/2 text-[200px] md:text-[300px] transition-all duration-3000 ease-in-out",
            isLaunched
              ? "opacity-0 scale-50 bottom-[-200vh]"
              : "opacity-100 scale-100 bottom-[-150px] md:bottom-[-225px]"
          )}
        >
          <div className="relative">🌎</div>
        </div>
        
        <div
            className={cn(
                "absolute z-10 transition-all duration-2000 ease-in-out w-24 h-24 md:w-32 md:h-32",
                !isLaunched && !hasLanded && "bottom-[80px] md:bottom-[120px]",
                isPreparingLaunch && !isLaunched && "animate-shake",
                isTakingOff && !isLaunched && "animate-take-off",
                isLaunched && !hasLanded && "bottom-1/2 translate-y-1/2 animate-float",
                hasLanded && "bottom-[80px] md:bottom-[120px] rotate-0"
            )}
        >
            <div className={cn("relative w-full h-full transition-transform duration-2000")}>
                 <Image
                    src="/roket.png"
                    fill
                    alt="Roket"
                    className="object-contain"
                />
            </div>
        </div>


        <div
          className={cn(
            "absolute left-1/2 -translate-x-1/2 text-[150px] md:text-[250px] transition-all duration-2000 ease-out",
            hasLanded
              ? "opacity-100 scale-100 bottom-[-110px] md:bottom-[-180px]"
              : "opacity-0 scale-50 top-[-150vh]"
          )}
        >
          🌕
        </div>
      </div>
    </main>
  );
}
