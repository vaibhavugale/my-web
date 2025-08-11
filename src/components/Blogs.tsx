import { ExternalLink } from "lucide-react";
import ReactPatterns from "../assets/reactPatterns.png";
import DefaultImage from "../assets/defaultImage.png";
import { cn } from "../utility";
const Blogs = () => {
  const blogs = [
    {
      image: ReactPatterns,
      title: "React Pattern: Single Responsibility in Component Design",
      desc: "In this blog, we explore the 'S' of the SOLID principles,the Single Responsibility.Principle with a real-world React example.",
      link: "https://juniper-meat-106.notion.site/React-Pattern-Single-Responsibility-in-Component-Design-23a294793fee80a4bb06fe044ea3a9d4",
      containerClass: "!border-[#2cd4fe] ",
    },
    {
      image: DefaultImage,
      title: "structuredClone : Deep Copy JavaScript",
      desc: "A real-world debugging story where API data behaved differently than dummy data, revealing why understanding data mutability and structure is crucial in JavaScript",
      link: "https://juniper-meat-106.notion.site/structuredClone-Deep-Copy-JavaScript-236294793fee805db8c2f87f3941f657?pvs=74",
      containerClass: "!border-yellow-400",
    },
  ];
  return (
    <div id="blogs" className="">
      <div className=" flex flex-col items-center">
        <p className="text-2xl text-center md:text-4xl">My Blogs</p>
      </div>
      <div className=" grid grid-cols-3 gap-5  mt-[2rem] md:mt-[5rem] grid-rows-auto">
        {blogs?.map((blog) => (
          <div
            className={cn(
              " border justify-baseline p-3 flex flex-col gap-2  shadow-md  rounded",
              blog.containerClass
            )}
          >
            <img
              src={blog?.image}
              className=" h-40 rounded w-full object-cover"
            />
            <p className=" text-md font-semibold tracking-wider">
              {blog?.title}
            </p>
            <p className=" text-md tracking-wider">{blog?.desc}</p>
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
