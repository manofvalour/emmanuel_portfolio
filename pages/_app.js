import { IBM_Plex_Sans, IBM_Plex_Serif, IBM_Plex_Mono } from 'next/font/google';
import '../styles/globals.css';

const plexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: '600',
  variable: '--font-sans',
  display: 'swap',
});

const plexSerif = IBM_Plex_Serif({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-serif',
  display: 'swap',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export default function App({ Component, pageProps }) {
  return (
    <div className={`${plexSans.variable} ${plexSerif.variable} ${plexMono.variable}`}>
      <Component {...pageProps} />
    </div>
  );
}