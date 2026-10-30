import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'QuizPulse - Mobile Quiz App (Expo & Hono)',
  description: 'Production-ready Expo React Native & Hono RPC Quiz application featuring dynamic categories, timed challenges, instant state feedback, and score analysis.',
  openGraph: {
    title: 'QuizPulse - Mobile Quiz App (Expo & Hono)',
    description: 'Production-ready Expo React Native & Hono RPC Quiz application featuring dynamic categories, timed challenges, instant state feedback, and score analysis.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QuizPulse - Mobile Quiz App (Expo & Hono)',
    description: 'Production-ready Expo React Native & Hono RPC Quiz application featuring dynamic categories, timed challenges, instant state feedback, and score analysis.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
