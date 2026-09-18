"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Brand from "@/components/Brand";
import About from "@/components/About";
import Differential from "@/components/Differential";
import Specialties from "@/components/Specialties";
import Method from "@/components/Method";
import Results from "@/components/Results";
import Schedule from "@/components/Schedule";
import Location from "@/components/Location";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import FormModal from "@/components/FormModal";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export default function Home() {
  const [formOpen, setFormOpen] = useState(false);
  const openForm = () => setFormOpen(true);

  return (
    <>
      <Header onOpenForm={openForm} />
      <main>
        <Hero onOpenForm={openForm} />
        <Marquee />
        <Brand />
        <About />
        <Differential />
        <Specialties onOpenForm={openForm} />
        <Method />
        <Results />
        <Schedule onOpenForm={openForm} />
        <Location />
        <FAQ />
      </main>
      <Footer />
      <WhatsAppFloat onOpenForm={openForm} />
      <FormModal isOpen={formOpen} onClose={() => setFormOpen(false)} />
    </>
  );
}
