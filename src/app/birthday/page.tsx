
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function BirthdayPage() {
  const [showBackToEarthButton, setShowBackToEarthButton] = useState(false);

  useEffect(() => {
    const visitedCake = sessionStorage.getItem('visited-cake');
    const visitedLetter = sessionStorage.getItem('visited-letter');
    const visitedGift = sessionStorage.getItem('visited-gift');

    if (visitedCake && visitedLetter && visitedGift) {
      setShowBackToEarthButton(true);
    }
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden bg-black">
      {/* Layer 1: Background Sky (Paling Belakang) */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/langit.png"
          fill
          alt="Latar belakang langit berbintang"
          className="object-cover"
          priority
          unoptimized
        />
      </div>
      <div className="absolute inset-0 bg-black/20 z-1" />

      {/* Layer 2: Moon Surface */}
      <div className="absolute bottom-0 left-0 w-full h-[50%] z-2">
        <Image
          src="/bulan.png"
          fill
          alt="Permukaan bulan"
          className="object-cover object-top"
          unoptimized
        />
      </div>
      
      {/* Layer 6: Foreground Text (Paling Depan) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full p-4 text-center z-30 mt-[5vh] md:mt-[8vh]">
        <h1 className="text-4xl md:text-5xl font-headline text-white drop-shadow-lg">
          HAPPY BIRTHDAY DZQ!
        </h1>
        <p className="text-lg text-white/80 mt-2 font-body drop-shadow-md animate-pulse-delay">
          Klik item di atas meja untuk melanjutkan
        </p>
      </div>

      {/* Layer 3: Astronaut */}
      <div className="absolute bottom-[10vh] md:bottom-[12vh] left-1/2 -translate-x-1/2 w-[60vw] h-[60vh] md:w-[30vw] md:h-[70vh] z-10">
        <Image
          src="/zak_naut.png"
          fill
          alt="Astronot"
          className="object-contain"
          unoptimized
        />
      </div>

      {/* Layer 4: Rocket */}
      <div className="absolute bottom-[35vh] left-[5vw] md:bottom-[25vh] md:left-[28vw] w-[20vw] h-[20vh] md:w-[8vw] md:h-[18vh] z-10">
        <Image
          src="/roket.png"
          fill
          alt="Roket"
          className="object-contain"
          unoptimized
        />
      </div>

      {/* Layer 5: Table and Items Container */}
      <div className="absolute bottom-[5vh] left-1/2 -translate-x-1/2 w-[90vw] h-[35vh] md:w-[45vw] md:h-[40vh] z-20">
        {/* The table image now acts as the background for this container */}
        <Image
          src="/meja.png"
          fill
          alt="Meja kayu"
          className="object-contain"
          unoptimized
        />
        {/* Interactive items container */}
        <div className="absolute inset-0 flex justify-center items-end">
          {/* Letter */}
          <Link href="/birthday/letter" className="group absolute bottom-[70%] md:bottom-[75%] w-[18%] h-[25%] left-[calc(50%-22%)] -translate-x-1/2 md:left-[calc(50%-20%)] transition-transform duration-300 hover:scale-105 hover:drop-shadow-[0_5px_15px_rgba(255,255,255,0.3)] [filter:drop-shadow(0_4px_6px_rgba(0,0,0,0.4))]">
            <Image
                src="/surat.png"
                fill
                alt="Surat"
                className="object-contain"
                unoptimized
            />
          </Link>
          
          {/* Cake */}
          <Link href="/birthday/cake" className="group absolute bottom-[70%] md:bottom-[75%] w-[22%] h-[35%] left-1/2 -translate-x-1/2 transition-transform duration-300 hover:scale-105 hover:drop-shadow-[0_5px_15px_rgba(255,255,255,0.3)] [filter:drop-shadow(0_4px_6px_rgba(0,0,0,0.4))]">
            <Image
              src="/kue.png"
              fill
              alt="Kue ulang tahun"
              className="object-contain"
              unoptimized
            />
          </Link>

          {/* Gift */}
          <Link href="/birthday/gift" className="group absolute bottom-[70%] md:bottom-[75%] w-[18%] h-[25%] right-[calc(50%-22%)] translate-x-1/2 md:right-[calc(50%-20%)] transition-transform duration-300 hover:scale-105 hover:drop-shadow-[0_5px_15px_rgba(255,255,255,0.3)] [filter:drop-shadow(0_4px_6px_rgba(0,0,0,0.4))]">
            <Image
                src="/kado.png"
                fill
                alt="Kado"
                className="object-contain"
                unoptimized
            />
          </Link>
        </div>
      </div>
       {showBackToEarthButton && (
        <div className="absolute bottom-4 right-4 z-30">
          <Link href="/goodbye" passHref>
            <Button
              size="lg"
              className="font-body text-base md:text-lg bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg transform hover:scale-105 transition-transform animate-in fade-in"
            >
              Back to Earth 🚀
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
