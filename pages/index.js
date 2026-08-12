import Hero from '../components/Hero';
import MethodRow from '../components/MethodRow'
import Work from '../components/Work';
import About from '../components/About';
import Contact from '../components/Contacts'

export default function Home() {
  return (
    <>
      <Hero />
      <MethodRow />
      <Work />
      <About />
      <Contact />
    </>
  );
}