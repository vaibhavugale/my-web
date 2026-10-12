import { Download } from "lucide-react";
import Image from "next/image";
import profile from "../assets/profilePick.jpeg";
import Github from "../assets/github.svg";
import Linkedin from "../assets/linkedin.svg";

const HeroSection = () => {
  return (
    <div id="about" className="flex flex-col md:flex-row gap-10 items-start justify-between pt-8 md:pt-14 pb-4">
      <div className="flex-1 flex flex-col items-start gap-5 w-full">
        <div className="flex items-center gap-2">
          <span className="text-3xl select-none">👨‍💻</span>
          <span className="brutal-tag text-[#37352f] bg-[#e3e2de]/60 font-mono">
            Software Engineer
          </span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#37352f] leading-tight">
          Hi, I&apos;m Vaibhav Ugale.
        </h1>
        
        <p className="text-base md:text-lg text-[#5a5853] leading-relaxed max-w-xl">
          I build high-performance, responsive web and mobile applications with React, Next.js, and Node.js. Focused on clean design, maintainable architecture, and crisp user experiences.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <a 
            target="_blank" 
            href="https://docs.google.com/document/d/1NfRdbtz7irwyIhi8wbRGlUsJDmsvtBk7G7CosLy_OBw/edit?usp=sharing" 
            download="vaibhav_ugale" 
            className="brutal-btn !bg-[#2383e2] !text-white !border-[#1e70c2] hover:!bg-[#1c73c9] gap-2 font-medium group transition-transform duration-150 hover:-translate-y-0.5"
          >
            <span>Resume</span>
            <Download className="w-4 h-4 transition-transform duration-200 group-hover:translate-y-0.5" />
          </a>
          
          <a 
            href="https://github.com/vaibhavugale" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="brutal-btn gap-2 text-[#37352f] hover:bg-[#efedea] group transition-transform duration-150 hover:-translate-y-0.5"
          >
            <div className="transition-transform duration-200 group-hover:scale-125 group-hover:rotate-12">
              <Image src={Github} className="w-4 h-4" alt="Github" />
            </div>
            <span>GitHub</span>
          </a>
          
          <a 
            href="https://www.linkedin.com/in/vaibhavugale-959aa2217" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="brutal-btn gap-2 text-[#37352f] hover:bg-[#efedea] group transition-transform duration-150 hover:-translate-y-0.5"
          >
            <div className="transition-transform duration-200 group-hover:scale-125 group-hover:-rotate-12">
              <Image src={Linkedin} className="w-4 h-4" alt="LinkedIn" />
            </div>
            <span>LinkedIn</span>
          </a>
        </div>
      </div>

      <div className="w-full md:w-auto flex justify-center md:justify-end mt-4 md:mt-0">
        <div className="relative group w-44 h-44 md:w-56 md:h-56 rounded-2xl overflow-hidden border border-[#e9e9e7] bg-[#fbfbfa] p-1.5 shadow-[0_2px_8px_rgba(15,15,15,0.04)]">
          <Image 
            src={profile} 
            className="w-full h-full object-cover rounded-xl transition-all duration-300" 
            alt="Vaibhav Ugale" 
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
