import { Mona_Sans } from 'next/font/google'
import type { Metadata } from "next";
import "./globals.css";
import { PinnedProvider } from '@/context/PinnedContext'

const mona = Mona_Sans({
  subsets: ['latin'],
  display: 'swap'
})

export const metadata: Metadata = {
  title: "Github Repos",
  description: "Pin github repos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={mona.className}>
      <body className={mona.className}>
        <PinnedProvider>
          {children}
        </PinnedProvider>
      </body>
    </html>
  );
}