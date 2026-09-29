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
    <div id="skills" className="flex flex-col gap-8 pt-10">
      <h2 className="text-4xl font-black uppercase tracking-tight">My Tech-Stack</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {categories.map((cat) => (
          <div key={cat.title} className="brutal-card p-6 md:p-8 flex flex-col gap-6 bg-white">
            <h3 className="text-2xl font-bold uppercase border-b-2 border-black pb-4">{cat.title}</h3>
            <div className="grid grid-cols-2 gap-5">
              {cat.skills.map(skill => (
                <div key={skill.name} className="flex items-center gap-3">
                  <div className="w-12 h-12 border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] bg-white">
                    <img src={skill.icon} alt={skill.name} className="w-6 h-6 object-contain" />
                  </div>
                  <span className="font-mono font-bold text-sm uppercase">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="brutal-card p-6 md:p-8 bg-[#2cd4fe]">
        <h3 className="text-xl font-bold uppercase mb-6 border-b-2 border-black pb-2 w-fit">Tools & Others</h3>
        <div className="flex flex-wrap gap-3">
          {tools.map(tool => (
            <span key={tool} className="brutal-tag !bg-white hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[4px_4px_0_0_#000] transition-all cursor-default">
              {tool}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
