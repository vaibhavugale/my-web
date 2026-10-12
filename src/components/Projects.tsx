"use client";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import RN_Marquee from "../assets/RN_Marquee.jpeg";
import studyNotion from "../assets/study_notion.png";
import { usePagination } from "../hooks/usePagination";

const Projects = () => {
    const projects = [
        {
            image: RN_Marquee,
            title: "Q2Q (Web3 E-Commerce Marketplace)",
            desc: "Built secure authentication workflows using JWT & OAuth2. Implemented deep linking with Web3 wallet integration for blockchain transactions, real-time socket connections via foreground service, and used NativeWind & Reanimated for styling.",
            link: "https://play.google.com/store/apps/details?id=com.quettaqmarketplaceapp",
            id: "q2q-web3"
        },
        {
            image: studyNotion,
            title: "Study Notion - A Ed-tech Platform",
            desc: "Study Notion is an innovative ed-tech platform designed to enhance the learning experience for students and teachers alike. It offers a variety of features to facilitate effective teaching and learning.",
            link: "https://juniper-meat-106.notion.site/Animated-Marquee-2b4294793fee800fadebda8035228e6c",
            id: "study-notion"
        },
    ];

    const { currentPage, totalPages, currentData, nextPage, prevPage } = usePagination({ data: projects, itemsPerPage: 4 });

    return (
        <div id="projects" className="flex flex-col gap-6 pt-4">
            <div className="flex items-center gap-2 border-b border-[#ececeb] pb-3">
                <span className="text-xl">🚀</span>
                <h2 className="text-2xl font-bold tracking-tight text-[#37352f]">Selected Projects</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {currentData?.map((blog) => (
                    <div key={blog.id} className="brutal-card p-4 flex flex-col gap-4 brutal-card-hover group">
                        <div className="h-44 md:h-52 overflow-hidden rounded-md border border-[#e9e9e7] relative bg-[#f7f6f5]">
                            <Image 
                                src={blog?.image} 
                                alt={blog?.title} 
                                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300" 
                            />
                        </div>
                        <div className="flex flex-col gap-2 flex-1">
                          <h3 className="text-base font-semibold text-[#37352f] leading-snug line-clamp-1">{blog?.title}</h3>
                          <p className="text-xs text-[#5a5853] leading-relaxed line-clamp-3">{blog?.desc}</p>
                        </div>
                        <a 
                            href={blog.link} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="brutal-btn flex items-center justify-center gap-1.5 mt-auto w-full text-xs font-medium"
                        >
                            <span>Open Project</span>
                            <ExternalLink className="w-3.5 h-3.5 text-[#787774]" />
                        </a>
                    </div>
                ))}
            </div>
            
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-6">
                    <button 
                        onClick={prevPage} 
                        disabled={currentPage === 1} 
                        className="brutal-btn !p-2 disabled:opacity-40"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="font-mono text-xs text-[#787774]">
                        {currentPage} / {totalPages}
                    </span>
                    <button 
                        onClick={nextPage} 
                        disabled={currentPage === totalPages} 
                        className="brutal-btn !p-2 disabled:opacity-40"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            )}
        </div>
    );
};
export default Projects;