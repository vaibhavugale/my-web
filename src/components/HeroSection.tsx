import { Download } from "lucide-react";
import Image from "next/image";
import profile from "../assets/profilePick.jpeg";
import Github from "../assets/github.svg";
import Linkedin from "../assets/linkedin.svg";

const HeroSection = () => {
  return (
    <div id="about" className="flex flex-col md:flex-row gap-12 items-center justify-between pt-10 md:pt-16">
      <div className="flex-1 flex flex-col items-start gap-6 w-full">
        <div className="brutal-tag inline-block bg-[#FFD700]">
          Software Engineer
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black uppercase leading-[1.1] tracking-tight">
          Hi, I'm <br />
          Vaibhav Ugale.
        </h1>
        
        <p className="text-lg md:text-xl font-medium leading-relaxed max-w-xl text-gray-800">
          I specialize in building high-performance, visually engaging applications with a focus on user experience. Clean, scalable, and maintainable code is my foundation.
        </p>

        <div className="flex flex-wrap items-center gap-4 mt-2">
          <a target="_blank" href={"https://docs.google.com/document/d/1NfRdbtz7irwyIhi8wbRGlUsJDmsvtBk7G7CosLy_OBw/edit?usp=sharing"} download={"vaibhav_ugale"} className="brutal-btn flex items-center gap-3">
            <span>Download CV</span>
            <Download className="w-5 h-5" />
          </a>
          
          <a href="https://github.com/vaibhavugale" target="_blank" rel="noopener noreferrer" className="brutal-card p-3 brutal-card-hover bg-white hover:bg-black hover:text-white transition-colors group">
            <Image src={Github} className="w-6 h-6 group-hover:invert transition-all" alt="Github" />
          </a>
          
          <a href="https://www.linkedin.com/in/vaibhavugale-959aa2217" target="_blank" rel="noopener noreferrer" className="brutal-card p-3 brutal-card-hover bg-white hover:bg-[#0077b5] transition-colors group">
            <Image src={Linkedin} className="w-6 h-6 group-hover:brightness-0 group-hover:invert transition-all" alt="LinkedIn" />
          </a>
        </div>
      </div>

      <div className="w-full md:w-auto flex justify-center md:justify-end mt-8 md:mt-0">
        <div className="brutal-card w-[280px] h-[320px] md:w-[350px] md:h-[420px] p-2 bg-white relative group">
          <div className="absolute inset-0 bg-[#FF90E8] translate-x-4 translate-y-4 border-2 border-black -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform"></div>
          <Image src={profile} className="w-full h-full object-cover border-2 border-black filter grayscale group-hover:grayscale-0 transition-all duration-300" alt="Vaibhav Ugale" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
