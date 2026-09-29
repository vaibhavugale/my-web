import { Mail, Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const menu = [
    { label: "About", route: "#about" },
    { label: "Skills", route: "#skills" },
    { label: "Experience", route: "#experience" },
    { label: "Projects", route: "#projects" },
    { label: "Blogs", route: "#blogs" },
  ];

  const [showSideBar, setShowSideBar] = useState(false);
  
  return (
    <div className="flex justify-between items-center py-6 sticky top-0 z-50 bg-[#fafafa]/90 backdrop-blur-sm border-b-2 border-black w-full">
      <div className="flex items-center gap-2 font-black text-2xl uppercase tracking-widest">
        VAIBHAV
      </div>

      <div className="hidden md:flex gap-8 items-center">
        {menu?.map((item) => {
          return (
            <a href={item.route} className="font-bold text-sm uppercase tracking-widest hover:underline decoration-2 underline-offset-4 transition-all" key={item.route}>
              {item?.label}
            </a>
          );
        })}
      </div>
      
      <div className="hidden md:flex justify-center items-center gap-3 font-mono font-bold text-sm border-2 border-black px-4 py-2 bg-black text-white shadow-[2px_2px_0_0_rgba(0,0,0,0.3)]">
        <Mail className="w-4 h-4" />
        <p>ugalevaibhav00@gmail.com</p>
      </div>

      <div className="relative inline md:hidden">
        <div className="cursor-pointer border-2 border-black p-1 shadow-[2px_2px_0_0_#000] bg-white" onClick={() => setShowSideBar(true)}>
          <Menu className="w-6 h-6" />
        </div>

        {showSideBar && (
          <div className="fixed inset-0 bg-white z-50 flex flex-col p-8 border-l-4 border-black">
            <div className="flex justify-end w-full">
              <div className="border-2 border-black p-2 shadow-[2px_2px_0_0_#000] bg-yellow-300 cursor-pointer" onClick={() => setShowSideBar(false)}>
                <X className="w-6 h-6" />
              </div>
            </div>
            <div className="flex flex-col gap-8 mt-12 items-center">
              {menu?.map((item) => {
                return (
                  <a onClick={() => setShowSideBar(false)} href={item.route} className="font-black uppercase text-3xl hover:underline decoration-4 underline-offset-8" key={item.route}>
                    {item?.label}
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
