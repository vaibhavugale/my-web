import Image from "next/image";
import JavaScriptIcon from "../assets/javaScript.svg";
import TypeScriptIcon from "../assets/typeScript.svg";
import PythonIcon from "../assets/python.svg";
import ReactIcon from "../assets/react.svg";
import NextJsIcon from "../assets/nextjs.svg";
import ReactNativeIcon from "../assets/testreact.svg";
import ReduxIcon from "../assets/redux.svg";
import TailwindIcon from "../assets/image.png";
import MuiIcon from "../assets/mui.svg";
import NodeJsIcon from "../assets/nodejs-original.svg";
import ExpressIcon from "../assets/express.svg";
import FastApiIcon from "../assets/fastapi.svg";
import PostgresIcon from "../assets/postgresql.svg";
import MongoDbIcon from "../assets/mongodb.svg";
import RedisIcon from "../assets/redis.svg";
import PgVectorIcon from "../assets/pgvector.svg";
import ChromaDbIcon from "../assets/chromadb.svg";
import LangChainIcon from "../assets/langchain.svg";
import StrapiIcon from "../assets/strapi.svg";
import FigmaIcon from "../assets/figma.svg";
import DockerIcon from "../assets/docker.svg";
import TurborepoIcon from "../assets/turborepo.svg";
import GithubIcon from "../assets/github.svg";

const Skills = () => {
  const categories = [
    {
      title: "Programming Languages",
      skills: [
        { name: "JavaScript", icon: JavaScriptIcon },
        { name: "TypeScript", icon: TypeScriptIcon },
        { name: "Python", icon: PythonIcon },
      ]
    },
    {
      title: "Frontend & Mobile",
      skills: [
        { name: "React.js", icon: ReactIcon },
        { name: "Next.js", icon: NextJsIcon },
        { name: "React Native (Android + iOS)", icon: ReactNativeIcon },
        { name: "Redux / RTK", icon: ReduxIcon },
        { name: "Tailwind CSS", icon: TailwindIcon },
        { name: "MUI", icon: MuiIcon },
        { name: "React Hooks", icon: ReactIcon },
      ]
    },
    {
      title: "Backend & Systems",
      skills: [
        { name: "Node.js", icon: NodeJsIcon },
        { name: "Express.js", icon: ExpressIcon },
        { name: "FastAPI", icon: FastApiIcon },
        { name: "Strapi CMS", icon: StrapiIcon },
        { name: "WebAuthn", icon: null, badge: "Auth" },
        { name: "MMKV", icon: null, badge: "Storage" },
      ]
    },
    {
      title: "Databases & Vector Stores",
      skills: [
        { name: "PostgreSQL", icon: PostgresIcon },
        { name: "MongoDB", icon: MongoDbIcon },
        { name: "Redis", icon: RedisIcon },
        { name: "PGvector", icon: PgVectorIcon },
        { name: "Chroma DB", icon: ChromaDbIcon },
      ]
    },
    {
      title: "AI & LLM Frameworks",
      skills: [
        { name: "LangChain", icon: LangChainIcon },
        { name: "LangGraph", icon: LangChainIcon },
        { name: "LangSmith", icon: LangChainIcon },
      ]
    },
    {
      title: "DevOps & Workflow",
      skills: [
        { name: "Git", icon: GithubIcon },
        { name: "Docker", icon: DockerIcon },
        { name: "Turborepo", icon: TurborepoIcon },
        { name: "Monorepo Architecture", icon: TurborepoIcon },
        { name: "Figma", icon: FigmaIcon },
        { name: "Agile / Scrum", icon: null, badge: "Methodology" },
      ]
    }
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
              {cat.skills.map((skill) => (
                <div key={skill.name} className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#f7f6f5] hover:bg-[#efedea] border border-[#e9e9e7] transition-colors cursor-default">
                  {skill.icon ? (
                    <Image src={skill.icon} alt={skill.name} className="w-4 h-4 object-contain" />
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-[#2383e2]"></span>
                  )}
                  <span className="text-sm font-medium text-[#37352f]">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
