import Blogs from "../components/Blogs";
import DatabaseBlogs from "../components/DatabaseBlogs";
import Experience from "../components/Experience";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import Skills from "../components/Skills";
import Footer from "../components/Footer";
import Projects from "../components/Projects";
import { getPublishedBlogs } from "../actions/blog";

export default async function Home() {
  const publishedBlogs = await getPublishedBlogs();

  return (
    <div className="no-scrollbar scroll-smooth w-full flex flex-col min-h-screen bg-white">
      <div className="max-w-[860px] mx-auto w-full px-5 md:px-8 flex flex-col gap-12 md:gap-16 pb-16 flex-1">
        <Header />
        <HeroSection />
        <Skills />
        <Experience />
        <Projects />
        <DatabaseBlogs blogs={publishedBlogs} />
        <Blogs />
      </div>
      <Footer />
    </div>
  );
}
