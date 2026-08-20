import Hero from '../components/Hero';
import MethodRow from '../components/MethodRow'
import Work from '../components/Work';
import About from '../components/About';
import Contact from '../components/Contacts'
import Head from 'next/head';


export default function Home() {
  return (
    <>
      <Head>
        <title>Emmanuel Ajala — ML Systems Engineering</title>
        <meta
          name="description"
          content="I design reproducible benchmark experiments for ML systems. I test engineering choices, measure trade-offs, and use evidence to understand what works."
        />
          <meta property="og:title" content="Emmanuel Ajala — ML Systems Engineering" />
          <meta property="og:description" content="Reproducible benchmark experiments for ML systems. I test engineering choices, measure trade-offs, and use evidence to understand what works." />
          <meta property="og:image" content="https://emmanuelajala.netlify.app/images/og-preview.png" />
          <meta property="og:url" content="https://emmanuelajala.netlify.app/" />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Hero />
      <MethodRow />
      <Work />
      <About />
      <Contact />
    </>
  );
}