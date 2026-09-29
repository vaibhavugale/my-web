import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
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
        <div id="projects" className="pt-10">
            <h2 className="text-4xl font-black uppercase tracking-tight mb-10">Projects</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {currentData?.map((blog) => (
                    <div key={blog.id} className="brutal-card p-6 flex flex-col gap-6 brutal-card-hover group">
                        <div className="border-2 border-black h-48 md:h-64 overflow-hidden shadow-[2px_2px_0_0_#000]">
                            <img src={blog?.image} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500" />
                        </div>
                        <div className="flex flex-col gap-3 flex-1">
                          <h3 className="text-2xl font-black uppercase leading-tight line-clamp-2">{blog?.title}</h3>
                          <p className="text-gray-800 font-medium line-clamp-3">{blog?.desc}</p>
                        </div>
                        <a href={blog.link} target="_blank" className="brutal-btn flex items-center justify-center gap-2 mt-auto !bg-white !text-black hover:!bg-black hover:!text-white w-full">
                            <span>Read More</span>
                            <ExternalLink className="w-5 h-5" />
                        </a>
                    </div>
                ))}
            </div>
            
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-6 mt-12">
                    <button onClick={prevPage} disabled={currentPage === 1} className="brutal-btn !p-3 !bg-white disabled:opacity-50 disabled:shadow-none">
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <span className="font-mono font-bold text-lg">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button onClick={nextPage} disabled={currentPage === totalPages} className="brutal-btn !p-3 !bg-white disabled:opacity-50 disabled:shadow-none">
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>
            )}
        </div>
    );
};
export default Projects;