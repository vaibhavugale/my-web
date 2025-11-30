import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import RN_Marquee from "../assets/RN_Marquee.jpeg";
import studyNotion from "../assets/study_notion.png";
import { cn } from "../utility";
import { usePagination } from "../hooks/usePagination";

const Projects = () => {
    const projects = [
        {
            image: RN_Marquee,
            title: "React Native Reanimated : Animated Marquee",
            desc: "In this blog, we explore how to create an animated marquee effect using React Native Reanimated library. We dive into the implementation details and provide code examples to help you get started.",
            link: "https://juniper-meat-106.notion.site/Animated-Marquee-2b4294793fee800fadebda8035228e6c",
            containerClass: "!border-[#A27E80]  ",
            id: "react-pattern-1"
        },
        {
            image: studyNotion,
            title: "Study Notion - A Ed-tech Platform",
            desc: "Study Notion is an innovative ed-tech platform designed to enhance the learning experience for students and teachers alike. It offers a variety of features to facilitate effective teaching and learning.",
            link: "https://juniper-meat-106.notion.site/Animated-Marquee-2b4294793fee800fadebda8035228e6c",
            containerClass: "!border-[#A27E80]  ",
            id: "study-notion"
        },

    ];

    const {
        currentPage,
        totalPages,
        currentData: currentProjects,
        nextPage,
        prevPage,
    } = usePagination({
        data: projects,
        itemsPerPage: 4,
    });

    return (
        <div id="projects" className="">
            <div className=" flex flex-col items-center">
                <p className="text-2xl  md:text-4xl">Projects</p>
            </div>
            <div className=" grid grid-cols-1 md:grid-cols-4 gap-5  mt-[2rem] md:mt-[5rem] grid-rows-auto">
                {currentProjects?.map((blog) => (
                    <div
                        key={blog.id}
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
                        <p className=" text-sm tracking-wider">{blog?.desc?.substring(0, 150) + "..."}</p>
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
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-6 mt-10">
                    <button
                        onClick={prevPage}
                        disabled={currentPage === 1}
                        className="p-2 border rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <span className="text-md font-medium text-gray-700 dark:text-gray-300">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={nextPage}
                        disabled={currentPage === totalPages}
                        className="p-2 border rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            )}
        </div >
    );
};

export default Projects;