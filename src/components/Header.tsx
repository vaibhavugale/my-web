import { Mail, Menu, X } from "lucide-react";
import  { useState } from "react";

const Header = () => {
  const menu = [
    {
      label: "About",
      route: "#about",
    },
    {
      label: "Skills",
      route: "#skills",
    },
    {
      label: "Experience",
      route: "#experience",
    },
    {
      label: "Blogs",
      route: "#blogs",
    },
    // {
    //   label: "Projects",
    //   route: "#projects",
    // },
    // {
    //   label: "Contact",
    //   route: "#contact",
    // },
  ];

  const [showSideBar, setShowSideBar] = useState(false);
  return (
    <div className="flex justify-between">
      <div className="flex justify-center items-center gap-2">
        <Mail className="w-4 h-4" />
        <p>ugalevaibhav00@gmail.com</p>
      </div>

      <div className="hidden md:flex gap-6  justify-between">
        {menu?.map((item) => {
          return (
            <a href={item.route} className="cursor-pointer">
              {item?.label}
            </a>
          );
        })}
      </div>
      <div className=" relative inline md:hidden">
        <Menu onClick={() => setShowSideBar(true)} />

        {showSideBar && (
          <div
            className=" absolute h-[100dvh] w-[30dvh] -right-3 gap-4 flex flex-col top-0 bg-white shadow-lg px-5
           "
          >
            <div className="flex justify-start items-center">
              <X className="w-5 h-5" />
              <p onClick={() => setShowSideBar(false)}>Close</p>
            </div>
            {menu?.map((item) => {
              return (
                <a
                  onClick={() => setShowSideBar(false)}
                  href={item.route}
                  className="cursor-pointer"
                >
                  {item?.label}
                </a>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
