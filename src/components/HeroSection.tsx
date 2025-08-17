import { Download } from "lucide-react";
import profile from "../assets/profilePick.jpeg";
import ReactIcon from "../assets/react.svg";
import NodeJSIcon from "../assets/nodejs-original.svg";
import TsIcon from "../assets/typeScript.svg";
import ReactNative from "../assets/testreact.svg";
import TailwindIcon from "../assets/image.png";
import NextJsIcon from "../assets/nextjs.svg";
import JavaScript from "../assets/javaScript.svg";
import Express from "../assets/express.svg";
import Postgres from "../assets/postgresql.svg";
import MongoDb from "../assets/mongodb.svg";
import Prisma from "../assets/prisma.png";
import Github from "../assets/github.svg";
import Linkedin from "../assets/linkedin.svg";
import resume from "../assets/vaibhav_ugale.pdf"
const HeroSection = () => {
  const icons = [
    ReactIcon,
    NodeJSIcon,
    TsIcon,
    ReactNative,
    TailwindIcon,
    NextJsIcon,
    JavaScript,
    Express,
    Postgres,
    MongoDb,
    Prisma,
  ];
  return (
    <div
      id="about"
      className=" flex pt-[3rem]  relative flex-col md:px-[5rem] gap-6  items-center justify-center "
    >
      <div className=" w-full rounded absolute -top-5 md:-top-30 -z-1 h-[30%] md:h-[50%]  overflow-hidden">
        {icons?.map((src, i) => {
          const top = Math.random() * 80;
          const left = Math.random() * 90;
          const delay = Math.random();
          return (
            <img
              key={i}
              src={src}
              className="w-10 h-10 animate-drift object-contain  animate-float absolute"
              style={{
                top: `${top}%`,
                left: `${left}%`,
                animationDelay: `${delay}s`,
              }}
            />
          );
        })}
      </div>
      <div className=" flex flex-col  justify-center items-center  gap-1 md:gap-3">
        <div className="bg-black outline-4 outline-white overflow-hidden w-35 h-35 rounded-full">
          <img src={profile} loading="lazy" />
        </div>
        <div className=" flex gap-3">
          <p className="text-xl md:text-2xl">Hi! I'm Vaibhav Ugale </p>
          <div className="flex  gap-3">
            <a
              href="https://www.linkedin.com/in/vaibhavugale-959aa2217"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={Linkedin}
                className="w-8 h-8 cursor-pointer hover-scale  "
              />
            </a>
            <a
              href="https://github.com/vaibhavugale"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={Github}
                className="w-8 h-8 cursor-pointer hover-scale "
              />
            </a>
          </div>
        </div>
        <p className="text-xl md:text-2xl">+91 93701 41891</p>
      </div>

      <p className="text-3xl md:text-6xl  text-center">
        Software Developer based in Mumbai, India
      </p>

      <p className=" md:text-xl tracking-wider md:px-[3rem]  text-center">
        I specialize in building high-performance, visually engaging
        applications with a focus on user experience. Clean, scalable, and
        maintainable code is the foundation of every solution I deliver.
      </p>

      <div className=" flex items-center  gap-6">
        <button className="bg-black text-white p-3 px-6 hover:bg-black/70 cursor-pointer rounded-full">
          Hire Me
        </button>
        <a href={resume}  download={"vaibhav_ugale"} className="flex cursor-pointer gap-3 ">
          <p>Download CV </p>
          <Download className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
};

export default HeroSection;
