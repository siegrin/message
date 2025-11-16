
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function CakePage() {
  const [isBlown, setIsBlown] = useState(false);
  
  useEffect(() => {
    sessionStorage.setItem('visited-cake', 'true');
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-background">
      <Card className="w-full max-w-md bg-card/80 backdrop-blur-sm">
        <CardContent className="p-6 flex flex-col items-center gap-6">
          <div className="relative w-64 h-64">
            <Image
              src="/cake.png"
              alt="Kue dengan lilin menyala"
              fill
              className={cn(
                'object-cover rounded-full transition-opacity duration-1000',
                isBlown ? 'opacity-0' : 'opacity-100'
              )}
              unoptimized
            />
            <Image
              src="/wish.png"
              alt="Make a wish"
              fill
              className={cn(
                'object-cover rounded-full transition-opacity duration-1000',
                isBlown ? 'opacity-100' : 'opacity-0'
              )}
            />
          </div>

          <div className="text-center h-20">
            {!isBlown ? (
              <Button onClick={() => setIsBlown(true)} size="lg">
                Tiup Lilin
              </Button>
            ) : (
              <div className="flex flex-col items-center gap-2 animate-in fade-in duration-500">
                <p className="text-2xl font-headline text-primary flex items-center">
                  <Sparkles className="w-6 h-6 mr-2" />
                  Make a wish!
                  <Sparkles className="w-6 h-6 ml-2" />
                </p>
              </div>
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
