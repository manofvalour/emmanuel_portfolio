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
          content="Reproducible benchmark experiments for ML systems. I test engineering choices, measure trade-offs, and use evidence to understand what works."
        />
      </Head>
      <Hero />
      <MethodRow />
      <Work />
      <About />
      <Contact />
    </>
  );
}