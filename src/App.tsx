import { useEffect, useRef, type ReactElement } from "react";
import Blogs from "./components/Blogs";
import Experience from "./components/Experience";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import Skills from "./components/Skills";

function App() {
 const blurRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (blurRef.current) {
        blurRef.current.style.transform = `translate(${e.clientX - 80}px, ${e.clientY - 80}px)`;
      }
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <div className="no-scrollbar pb-5 scroll-smooth max-w-[1080px] flex flex-col  gap-[4rem] md:gap-[10rem]   justify-between  overflow-y-scroll  h-[100vh] overflow-hidden  m-auto pt-[2rem] px-[1.3rem] md:px[5rem]">
      <Header />
      <HeroSection />
      <Skills />
      <Experience />
      <Blogs />
      <div
        ref={blurRef}
        className="pointer-events-none -left-10 absolute w-60 h-50 bg-purple-500 rounded-full blur-3xl opacity-40"
      />
    </div>
  );
}

export default App;
