import Blogs from "./components/Blogs";
import Experience from "./components/Experience";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import Skills from "./components/Skills";
import Footer from "./components/Footer";
import Projects from "./components/Projects";

function App() {
  return (
    <div className="no-scrollbar scroll-smooth w-full flex flex-col overflow-y-scroll h-[100vh] overflow-x-hidden m-auto bg-[#fafafa] relative">
      <div className="absolute inset-0 bg-grid pointer-events-none z-0"></div>
      
      <div className="max-w-[1024px] mx-auto w-full px-4 md:px-8 relative z-10 flex flex-col gap-[6rem] md:gap-[8rem] pb-20">
        <Header />
        <HeroSection />
        <Skills />
        <Experience />
        <Projects />
        <Blogs />
      </div>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}

export default App;
