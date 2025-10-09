import { ExternalLink } from "lucide-react";
import ReactPatterns from "../assets/reactPatterns.png";
import DefaultImage from "../assets/defaultImage.png";
import TailwindImage from "../assets/tailwind.png"
import EtagAnd304 from "../assets/etag-304.png"
import { cn } from "../utility";
const Blogs = () => {
  const blogs = [
    {
      image: ReactPatterns,
      title: "React Pattern: Single Responsibility in Component Design",
      desc: "In this blog, we explore the 'S' of the SOLID principles,the Single Responsibility.Principle with a real-world React example.",
      link: "https://juniper-meat-106.notion.site/React-Pattern-Single-Responsibility-in-Component-Design-23a294793fee80a4bb06fe044ea3a9d4",
      containerClass: "!border-[#2cd4fe] ",
      id:"react-pattern"
    },
    {
      image: DefaultImage,
      title: "structuredClone : Deep Copy JavaScript",
      desc: "A real-world debugging story where API data behaved differently than dummy data, revealing why understanding data mutability and structure is crucial in JavaScript",
      link: "https://juniper-meat-106.notion.site/structuredClone-Deep-Copy-JavaScript-236294793fee805db8c2f87f3941f657?pvs=74",
      containerClass: "!border-yellow-400",
      id:"structuredClone"
    },
    {
      image: TailwindImage,
      title: "cn vs clsx vs twMerge — Tailwind Utility Management",
      desc: "Learn why string concatenation fails with Tailwind, how clsx handles conditional classes, twMerge resolves conflicts, and cn combines both for clean, maintainable components.",
      link: "https://juniper-meat-106.notion.site/cn-vs-clsx-vs-twMerge-25a294793fee80b4a509e91830435392",
      containerClass: "!border-blue-400",
      id:"cn-clsx-twMerge"
    },
    {
      image: EtagAnd304,
      title: "ETag and If-None-Match Headers",
      desc: "Understand how HTTP 304 and ETag reduce bandwidth usage, speed up page loads, and keep your cached content up to date.",
      link: "https://juniper-meat-106.notion.site/ETag-and-If-None-Match-Headers-The-Secret-Behind-304-Not-Modified-Responses-286294793fee80f98f26d533ea50f0e1",
      containerClass: "!border-blue-400",
      id:"etag-304"
    },
  ];
  return (
    <div id="blogs" className="">
      <div className=" flex flex-col items-center">
        <p className="text-2xl text-center md:text-4xl">My Blogs</p>
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-4 gap-5  mt-[2rem] md:mt-[5rem] grid-rows-auto">
        {blogs?.map((blog) => (
          <div
          id={blog.id}
            className={cn(
              " border justify-baseline p-3 flex flex-col gap-2  shadow-md  rounded",
              blog.containerClass
            )}
          >
            <img
              src={blog?.image}
              className=" h-30 rounded w-full object-cover"
            />
            <p className=" text-sm font-semibold tracking-wider">
              {blog?.title}
            </p>
            <p className=" text-sm tracking-wider">{blog?.desc?.substring(0,150)+"..."}</p>
            <a
              href={blog.link}
              target="_blank"
              className=" flex text-blue-300  mt-auto items-center gap-2"
            >
              Read More <ExternalLink className="w-5 h-5" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
