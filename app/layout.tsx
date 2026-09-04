import type { Metadata } from 'next';
import { Geist, Lora } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const lora = Lora({
  variable: '--font-lora',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Kupa Game Cafe | QR Menü',
  description: 'Kupa Game Cafe mobil QR menüsü',
  metadataBase: new URL('https://kupa-game-cafe-menu.dijitalpanter.chatgpt.site'),
  openGraph: {
    title: 'Kupa Game Cafe | Mobil QR Menü',
    description: 'Kupa Game Cafe menüsünü keşfet, kategorilerde gezin ve favorilerini seç.',
    images: ['/og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kupa Game Cafe | Mobil QR Menü',
    description: 'Kupa Game Cafe menüsünü keşfet, kategorilerde gezin ve favorilerini seç.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${geistSans.variable} ${lora.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
