
'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function LetterPage() {
    useEffect(() => {
        sessionStorage.setItem('visited-letter', 'true');
    }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-background">
      <Card
        className="w-full max-w-2xl bg-card/80 backdrop-blur-sm"
        style={{
          backgroundImage: `url('https://www.transparenttextures.com/patterns/old-paper.png')`,
          backgroundBlendMode: 'overlay',
          backgroundColor: 'hsl(var(--card) / 0.9)',
        }}
      >
        <CardContent className="p-8 md:p-12">
          <ScrollArea className="h-[400px] w-full pr-4">
            <div className="prose prose-lg prose-invert max-w-none text-foreground/90 font-headline leading-loose" style={{fontFamily: "'Playfair Display', serif"}}>
              <p>Another year wiser and greater! Selamat 19 tahun DZQ! Gua mau ucapin terimakasih udah jadi partner lomba selama ini walaupun gua belum bisa bawa kemenangan. Gua tau tahun ini mungkin terasa seperti jeda, tapi gapapa. It's just a pause, not a stop sign.</p>
              <br />
              <p>Semoga di usia 19 ini, dirimu bisa bawa kemenangan-kemenangan lainnya yaa. Gua yakin akan challenging di usia ini, tapi itulah letak asiknya wkwk. You deserve the best, not just on the competition stage, but in every aspect of your life, dzq.</p>
              <p className='text-center italic'>Let's fly to the moon together!</p>
            </div>
          </ScrollArea>
          
          <div className="mt-8 text-center">
            <Link href="/birthday" passHref>
              <Button variant="outline" className="bg-transparent hover:bg-white/10">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Kembali
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
