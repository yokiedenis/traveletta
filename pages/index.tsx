import type { NextPage } from 'next';
import Head from 'next/head';
import Hero from '../components/Hero';
import AboutUs from '../components/AboutUs';
import FeaturedPackages from '../components/FeaturedPackages';
import SpecialExperiences from '../components/SpecialExperiences';
import CustomTripPlanner from '../components/CustomTripPlanner';
import Gallery from '../components/Gallery';
import Testimonials from '../components/Testimonials';
import BlogSection from '../components/BlogSection';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Ariella Adventures - Tourism Website</title>
        <meta name="description" content="Explore Uganda & Beyond with Ariella Adventures" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Hero />
        <AboutUs />
        <FeaturedPackages />
        <SpecialExperiences />
        <CustomTripPlanner />
        <Gallery />
        <Testimonials />
        <BlogSection />
        <Contact />
        <Footer />
      </main>
    </>
  );
};

export default Home;
