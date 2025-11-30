const Experience = () => {
  const items = [
    {
      metaData: {
        title: "Emertech Innovations (Full Time)",
        des: "(Aug 2024 - Present) - On Site",
      },
      details: {
        label: "Frontend Developer",
        description:
          "Building high-performance B2B web dashboards and Android applications, improving user experience and supporting critical business workflows.",
      },
    },
    {
      metaData: {
        title: "Suven Consultants and Technology Pvt.Ltd. (Internship)",
        des: "6 Month  (Jun 2023 - Nov 2023) - Remote",
      },
      details: {
        label: "Web Developer",
        description:
          "Developed an analytics dashboard for a Buy Now, Pay Later (BNPL) service, processing large datasets and delivering clear insights via dynamic tables and interactive charts.",
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
      <div className=" flex flex-col items-center">
        <p>Experience</p>
        <p className="text-2xl text-center md:text-4xl">
          My Education & Experience{" "}
        </p>
      </div>
      <div className="flex  gap-8   mt-[2rem] md:mt-[5rem] flex-col">
        {items?.map((block, index) => (
          <div className="" key={index}>
            <div className=" flex flex-col md:flex-row justify-between">
              <div className="flex-1">
                <p className="font-semibold">{block.metaData.title}</p>
                <p className="tracking-wider">{block.metaData.des}</p>
              </div>

              <div className="flex-1  h-full relative ">
                <div className="flex  gap-6">
                  <div>
                    <div className="md:bg-slate-100  hidden  md:flex  justify-center items-center md:w-[2rem] md:h-[2rem] rounded-full">
                      <div className="bg-black md:w-4 md:h-4 rounded-full"></div>
                    </div>
                  </div>

                  <div>
                    <p className="font-semibold ">{block.details.label}</p>
                    <p className="tracking-wider">
                      {block.details.description}
                    </p>
                  </div>
                </div>
                {index !== items.length - 1 && (
                  <div className="h-full invisible  md:visible left-3.5 -z-1 top-3 bg-black w-[2px] absolute"></div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
