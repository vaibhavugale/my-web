import { Download } from "lucide-react";
import profile from "../assets/profilePick.jpeg";
import Github from "../assets/github.svg";
import Linkedin from "../assets/linkedin.svg";

const HeroSection = () => {
  return (
    <div id="about" className="flex flex-col md:flex-row gap-12 md:gap-8 items-center justify-between pt-10 md:pt-20">
      
      <div className="flex-1 flex flex-col items-start gap-6 w-full order-2 md:order-1">
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

        <div className="flex flex-wrap items-center gap-4 mt-4">
          <a target="_blank" href={"https://docs.google.com/document/d/1NfRdbtz7irwyIhi8wbRGlUsJDmsvtBk7G7CosLy_OBw/edit?usp=sharing"} download={"vaibhav_ugale"} className="brutal-btn flex items-center gap-3 !bg-[#FF90E8] !text-black hover:!bg-black hover:!text-white">
            <span>Download CV</span>
            <Download className="w-5 h-5" />
          </a>
          
          <a href="https://github.com/vaibhavugale" target="_blank" rel="noopener noreferrer" className="brutal-card p-3 brutal-card-hover !bg-white">
            <img src={Github} className="w-7 h-7" alt="Github" />
          </a>
          
          <a href="https://www.linkedin.com/in/vaibhavugale-959aa2217" target="_blank" rel="noopener noreferrer" className="brutal-card p-3 brutal-card-hover !bg-white">
            <img src={Linkedin} className="w-7 h-7" alt="LinkedIn" />
          </a>
        </div>
      </div>

      <div className="flex-1 flex justify-center md:justify-end w-full order-1 md:order-2">
        <div className="brutal-card w-[280px] h-[350px] md:w-[380px] md:h-[460px] p-2 bg-white rotate-2 hover:rotate-0 transition-transform duration-500">
          <img src={profile} className="w-full h-full object-cover border-2 border-black filter grayscale hover:grayscale-0 transition-all duration-500" alt="Vaibhav Ugale" />
        </div>
      </div>

    </div>
  );
};

export default HeroSection;
