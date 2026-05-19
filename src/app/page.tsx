import About from '@/components/landing/About';
import Blog from '@/components/landing/Blog';
import CTA from '@/components/landing/CTA';
import Capabilities from '@/components/landing/Capabilities';
import Experience from '@/components/landing/Experience';
import Github from '@/components/landing/Github';
import Hero from '@/components/landing/Hero';
import Journey from '@/components/landing/Journey';
import Labs from '@/components/landing/Labs';
import MarqueeTicker from '@/components/landing/MarqueeTicker';
import Method from '@/components/landing/Method';
import Projects from '@/components/landing/Projects';
import Setup from '@/components/landing/Setup';
import Testimonial from '@/components/landing/Testimonial';
import Work from '@/components/landing/Work';
import React from 'react';

const page = () => {
  return (
    <main>
      <Hero />
      <MarqueeTicker />
      <About />
      <Capabilities />
      <Labs />
      <Method />
      <Work />
      <Testimonial />
      <Experience />
      <Projects />
      <Github />
      <Blog />
      <Setup />
      <Journey />
      <CTA />
    </main>
  );
};

export default page;
