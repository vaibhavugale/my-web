const Experience = () => {
  const items = [
    {
      metaData: {
        title: "Emertech Innovations (Full Time)",
        des: "(Aug 2024 - Present) - On Site",
      },
      details: {
        label: "Software Engineer",
        description:
          "Building high-performance B2B web dashboards and Android applications, improving user experience and supporting critical business workflows.",
      },
    },

    {
      metaData: {
        title: "Savitribai Phule Pune University (India)",
        des: "4 years (2020-2024)",
      },
      details: {
        label: "Bachelors Of Engineering (Computer Science)",
        description:
          "I have completed my Bachelor of Engineering (B.E.) in Computer Science from Smt. Kashibai Navale College Of Engineering ,Pune with an overall CGPA of 8.8.",
      },
    },
  ];
  return (
    <div id="experience" className="">
      <div className="flex flex-col items-center mb-[3rem] md:mb-[5rem]">
        <p className="text-sm md:text-base">Experience</p>
        <p className="text-2xl text-center md:text-4xl font-semibold">
          My Education & Experience{" "}
        </p>
      </div>
      
      <div className="relative mt-[2rem] md:mt-[5rem]">
        {/* Center line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-black md:transform md:-translate-x-1/2"></div>

        <div className="space-y-8 md:space-y-12 pl-12 md:pl-0">
          {items?.map((block, index) => (
            <div 
              key={index}
              className={`flex md:flex-row flex-row items-start gap-4 md:gap-0 relative ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Dot on line - Mobile */}
              <div className="md:hidden absolute -left-3 top-2 w-2 h-2 bg-black rounded-full"></div>

              {/* Dot on line - Desktop */}
              <div className="hidden md:block absolute left-1/2 top-2 w-2 h-2 bg-black rounded-full transform -translate-x-1/2"></div>

              {/* Content */}
              <div className={`flex-1 md:w-[calc(50%-2rem)] md:px-6 ${index % 2 === 0 ? "md:text-right md:pr-8" : "md:text-left md:pl-8"}`}>
                <div className="p-5 md:p-6 rounded-lg bg-slate-50">
                  <p className="font-semibold text-lg">{block.metaData.title}</p>
                  <p className="text-sm tracking-wider text-gray-600 mb-3">{block.metaData.des}</p>
                  
                  <div className="h-px bg-slate-300 my-3"></div>
                  
                  <p className="font-semibold text-base mb-2">{block.details.label}</p>
                  <p className="tracking-wider text-sm leading-relaxed text-gray-700">
                    {block.details.description}
                  </p>
                </div>
              </div>

              {/* Desktop: Empty space for alternating layout */}
              <div className="hidden md:block flex-1 md:w-[calc(50%-2rem)]"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;
