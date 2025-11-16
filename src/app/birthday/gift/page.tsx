
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { ArrowLeft, Gift } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function GiftPage() {
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    sessionStorage.setItem('visited-gift', 'true');
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-background">
      <Card className="w-full max-w-md bg-card/80 backdrop-blur-sm">
        <CardContent className="p-6 flex flex-col items-center gap-6">
          <div className="w-full text-center">
            <h2 className="text-2xl font-headline text-primary">A Gift For You</h2>
          </div>

          <div className="w-full aspect-video relative rounded-lg overflow-hidden border flex items-center justify-center">
            {!isOpened ? (
              <div
                className="w-full h-full flex flex-col items-center justify-center cursor-pointer group"
                onClick={() => setIsOpened(true)}
              >
                <div className="relative w-48 h-48 transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src="/gift.png"
                    alt="Klik untuk membuka kado"
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
                <p className="mt-4 text-sm text-muted-foreground flex items-center gap-2">
                  <Gift className="w-4 h-4" />
                  Klik untuk membuka
                </p>
              </div>
            ) : (
              <video
                src="/music.mp4"
                autoPlay
                loop
                controls
                playsInline
                className="w-full h-full object-cover animate-in fade-in"
              />
            )}
          </div>

          <Link href="/birthday" passHref>
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali
            </Button>
          </Link>
        </CardContent>
      </Card>
    </main>
  );
}
