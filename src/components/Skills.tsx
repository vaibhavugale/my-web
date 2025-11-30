import ReactIcon from "../assets/react.svg";
import NodeJSIcon from "../assets/nodejs-original.svg";
import TsIcon from "../assets/typeScript.svg";
import ReactNative from "../assets/testreact.svg";
import TailwindIcon from "../assets/image.png";
import NextJsIcon from "../assets/nextjs.svg";
import { cn } from "../utility";
import JavaScript from "../assets/javaScript.svg";
import Express from "../assets/express.svg";
import Postgres from "../assets/postgresql.svg";
import MongoDb from "../assets/mongodb.svg";
import Prisma from "../assets/prisma.png";
import Android from "../assets/androidstudio.svg";
import Backend from "../assets/backend.svg";
import ReactIconW from "../assets/reactWhite.svg";

const Skills = () => {
  const expertise = [
    {
      label: "Web Development",
      des: "Building dynamic web apps with React, Next.js, and cutting-edge CSS frameworks for speed and style.",
      icon: ReactIconW,
    },
    {
      label: "Android App Development",
      des: "Developed Android applications using React Native, delivering high-speed and robust APKs for B2B solutions.",
      icon: Android,
    },
    {
      label: "Backend Development",
      des: "Building scalable backends with Node.js and Express, powered by flexible SQL and NoSQL database solutions",
      icon: Backend,
    },
  ];

  const skills = {
    frontend: [
      {
        name: "JavaScript",
        icon: JavaScript,
        textClassName: "!text-yellow-400",
      },
      { name: "TypeScript", icon: TsIcon, textClassName: "!text-blue-400" },
      {
        name: "React JS",
        icon: ReactIcon,
        iconClasses: "animate-rotate-360",
        textClassName: "!text-[#73e5fe]",
      },
      {
        name: "Tailwind CSS",
        icon: TailwindIcon,
        iconClasses: "object-contain	",
        textClassName: "!text-[#37bdf9]",
      },
      {
        name: "React Native",
        icon: ReactNative,
        textClassName: "!text-[#73e5fe]",
      },
      { name: "Next Js", icon: NextJsIcon, textClassName: "!text-[#000]" },
    ],
    backend: [
      {
        name: "Node JS",
        icon: NodeJSIcon,
        textClassName: "!text-[#000]",
        iconClasses: "  ",
      },
      { name: "Express Js", icon: Express, textClassName: "!text-[#000]" },
      { name: "PostgresSql", icon: Postgres, textClassName: "!text-[#336791]" },
      { name: "MongoDB", icon: MongoDb, textClassName: "!text-[#4faa41]" },
      {
        name: "Prisma",
        icon: Prisma,
        iconClasses: "object-contain	",
        textClassName: "!text-[#000]",
      },
    ],
    other: ["Problem solving", "Web Designing", "DSA"],
  };
  return (
    <div
      id="skills"
      className="flex md:flex-row flex-col-reverse justify-center   gap-10 md:gap-8  "
    >
      <div className="flex-1 flex flex-col gap-8 justify-between">
        {expertise?.map((item) => {
          return (
            <div key={item.label}>
              <div className="flex gap-4">
                <div>
                  <div className="bg-black w-[3rem] h-[3rem] flex justify-center items-center rounded-[30px]">
                    <img src={item?.icon} className="w-8 h-8 m-auto" />
                  </div>
                </div>
                <div>
                  <p className=" font-semibold">{item?.label}</p>
                  <p className="tracking-wider">{item?.des}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex-1 flex flex-col gap-8">
        <div>
          <p className="tracking-wider ">Skills</p>
          <p className="text-4xl ">My Tech-Stack</p>
        </div>
        <div>
          <p className="tracking-wider">Frontend</p>
          <div className="flex flex-wrap gap-1">
            {skills.frontend.map((skill) => (
              <div
                key={skill.name}
                className={cn(
                  "md-code flex items-center gap-3",
                  skill.textClassName
                )}
              >
                <img
                  className={cn(skill.iconClasses, "w-5 h-5")}
                  src={skill.icon}
                />
                <p>{skill.name}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="tracking-wider">Backend</p>
          <div className="flex flex-wrap gap-1">
            {skills.backend.map((skill) => (
              <div
                key={skill.name}
                className={cn(
                  "md-code flex items-center gap-3",
                  skill.textClassName
                )}
              >
                <img
                  className={cn("w-5 h-8", skill?.iconClasses)}
                  src={skill.icon}
                />
                <p>{skill.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
