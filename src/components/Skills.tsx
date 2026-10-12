import Image from "next/image";
import JavaScriptIcon from "../assets/javaScript.svg";
import PythonIcon from "../assets/python.svg";
import TsIcon from "../assets/typeScript.svg";
import NextJsIcon from "../assets/nextjs.svg";
import ReactIcon from "../assets/react.svg";
import ReactNativeIcon from "../assets/testreact.svg";
import PostgresIcon from "../assets/postgresql.svg";
import MongoDbIcon from "../assets/mongodb.svg";
import RedisIcon from "../assets/redis.svg";
import PgVectorIcon from "../assets/pgvector.svg";
import ChromaDbIcon from "../assets/chromadb.svg";

const Skills = () => {
  const categories = [
    {
      title: "Languages",
      skills: [
        { name: "JavaScript", icon: JavaScriptIcon },
        { name: "TypeScript", icon: TsIcon },
        { name: "Python", icon: PythonIcon },
      ]
    },
    {
      title: "Frontend & Mobile Frameworks",
      skills: [
        { name: "Next.js", icon: NextJsIcon },
        { name: "React.js", icon: ReactIcon },
        { name: "React Native (Android + iOS)", icon: ReactNativeIcon },
      ]
    },
    {
      title: "Databases",
      skills: [
        { name: "PostgreSQL", icon: PostgresIcon },
        { name: "MongoDB", icon: MongoDbIcon },
        { name: "Redis", icon: RedisIcon },
      ]
    },
    {
      title: "Vector Databases",
      skills: [
        { name: "PGvector", icon: PgVectorIcon },
        { name: "Chroma DB", icon: ChromaDbIcon },
      ]
    }
  ];

  const tools = [
    "Node.js", "Express", "Tailwind CSS", "Prisma", "Redux", "REST API", "Git", "Docker", "CI/CD"
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
        <span className="text-xs font-mono font-medium text-[#787774] uppercase tracking-wider">Additional Tools & Libraries</span>
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
