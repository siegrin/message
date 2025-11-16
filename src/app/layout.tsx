import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Nunito, Playfair_Display, Source_Code_Pro } from 'next/font/google';
import { cn } from '@/lib/utils';

const fontBody = Nunito({
  subsets: ['latin'],
  variable: '--font-body',
});

const fontHeadline = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-headline',
});

const fontCode = Source_Code_Pro({
  subsets: ['latin'],
  variable: '--font-code',
});


export const metadata: Metadata = {
  title: 'A Message for DZQ',
  description: 'A special birthday message.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={cn(
        "font-body antialiased",
        fontBody.variable,
        fontHeadline.variable,
        fontCode.variable
      )}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
