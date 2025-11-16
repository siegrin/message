
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-background">
      <div className="w-full max-w-md md:max-w-2xl text-center">
        <h1 className="text-4xl md:text-5xl font-headline text-primary mb-8">
          A Message for DZQ
        </h1>
        <Link href="/start" passHref>
          <Button
            size="lg"
            className="font-body text-base md:text-lg bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg transform hover:scale-105 transition-transform"
          >
            Mulai
          </Button>
        </Link>
      </div>
    </main>
  );
}
