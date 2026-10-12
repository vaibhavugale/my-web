import Image from "next/image";
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

const Skills = () => {
  const categories = [
    {
      title: "Frontend",
      skills: [
        { name: "React", icon: ReactIcon },
        { name: "Next.js", icon: NextJsIcon },
        { name: "React Native", icon: ReactNative },
        { name: "Tailwind", icon: TailwindIcon },
        { name: "JavaScript", icon: JavaScript },
        { name: "TypeScript", icon: TsIcon },
      ]
    },
    {
      title: "Backend",
      skills: [
        { name: "Node.js", icon: NodeJSIcon },
        { name: "Express", icon: Express },
        { name: "PostgreSQL", icon: Postgres },
        { name: "MongoDB", icon: MongoDb },
        { name: "Prisma", icon: Prisma },
      ]
    }
  ];

  const tools = [
    "Redux", "React Hooks", "REST API", "Git", "CI/CD", 
    "Vite", "Jest", "Docker", "Figma", "Problem Solving"
  ];

  return (
    <div id="skills" className="flex flex-col gap-6 pt-4">
      <div className="flex items-center gap-2 border-b border-[#ececeb] pb-3">
        <span className="text-xl">🛠️</span>
        <h2 className="text-2xl font-bold tracking-tight text-[#37352f]">Tech Stack & Skills</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((cat) => (
          <div key={cat.title} className="brutal-card p-5 flex flex-col gap-4 bg-white">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-medium text-[#787774] uppercase tracking-wider">{cat.title}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {cat.skills.map(skill => (
                <div key={skill.name} className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#f7f6f5] hover:bg-[#efedea] border border-[#e9e9e7] transition-colors cursor-default">
                  <Image src={skill.icon} alt={skill.name} className="w-4 h-4 object-contain" />
                  <span className="text-sm font-medium text-[#37352f]">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="brutal-card p-5 bg-white flex flex-col gap-3">
        <span className="text-xs font-mono font-medium text-[#787774] uppercase tracking-wider">Tools & Concepts</span>
        <div className="flex flex-wrap gap-2">
          {tools.map(tool => (
            <span key={tool} className="brutal-tag text-[#37352f] bg-[#f1f1ef] hover:bg-[#e9e9e7] px-2.5 py-1 text-xs font-medium rounded-md">
              #{tool}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
