"use client";

import { useState } from "react";
import Loader from "@/components/Loader/Loader";
import MainScreen from "@/components/Loader/MainScreen";
import AboutMe from "@/components/Intro/Aboutme";
import Projects from "@/components/Projects/Projects";
import GuestBook from "@/components/GuestBook/GuestBook";
import GitName from "@/components/GitName/GitName";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

export default function Home() {
  const [loadingDone, setLoadingDone] = useState(false);

  if (!loadingDone) {
    return <Loader onFinish={() => setLoadingDone(true)} />;
  }

  return (
    <>
      <Header />
      <MainScreen />
      <section id="about">
        <AboutMe />
      </section>
      <section id="projects">
        <Projects />
      </section>
      <section id="guestbook">
        <GuestBook />
      </section>
      <GitName />
      <Footer />
    </>
  );
}
