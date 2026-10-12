const Experience = () => {
  const items = [
    {
      role: "Software Engineer",
      company: "Emertech Innovations",
      type: "Full Time • On Site",
      date: "Aug 2024 - Present",
      description: "Involved in the full product development cycle. Building and shipping features across multiple live products, collaborating on architecture decisions, and ensuring smooth execution from planning to deployment."
    },
    {
      role: "B.E. Computer Science",
      company: "Smt. Kashibai Navale College Of Engineering",
      type: "Education",
      date: "2020 - 2024",
      description: "Completed my Bachelor of Engineering in Computer Science from Savitribai Phule Pune University with an overall CGPA of 8.8."
    }
  ];

  return (
    <div id="experience" className="flex flex-col gap-6 pt-4">
      <div className="flex items-center gap-2 border-b border-[#ececeb] pb-3">
        <span className="text-xl">💼</span>
        <h2 className="text-2xl font-bold tracking-tight text-[#37352f]">Experience & Education</h2>
      </div>
      
      <div className="flex flex-col gap-3">
        {items.map((item, i) => (
          <div key={i} className="brutal-card p-5 md:p-6 flex flex-col md:flex-row gap-4 md:gap-8 bg-white brutal-card-hover group cursor-default">
            <div className="md:w-1/3 flex flex-col gap-1.5">
              <span className="font-semibold text-base text-[#37352f]">{item.company}</span>
              <span className="text-xs font-mono text-[#787774]">{item.date}</span>
              <span className="brutal-tag w-fit text-[11px] mt-1">{item.type}</span>
            </div>
            
            <div className="md:w-2/3 flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-[#37352f]">{item.role}</h3>
              <p className="text-sm text-[#5a5853] leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
