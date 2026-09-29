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
    <div id="experience" className="pt-10">
      <h2 className="text-4xl font-black uppercase tracking-tight mb-10">Experience</h2>
      
      <div className="flex flex-col gap-8">
        {items.map((item, i) => (
          <div key={i} className="brutal-card p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-12 brutal-card-hover group cursor-default bg-white">
            <div className="md:w-1/3 flex flex-col gap-3 border-l-4 border-black pl-4">
              <h3 className="text-xl font-bold uppercase leading-tight">{item.company}</h3>
              <span className="font-mono text-sm font-bold bg-[#FFD700] border-2 border-black px-2 py-1 w-fit shadow-[2px_2px_0_0_#000]">{item.date}</span>
            </div>
            
            <div className="md:w-2/3 flex flex-col gap-3">
              <div className="flex flex-col">
                <h4 className="text-2xl font-black uppercase">{item.role}</h4>
                <span className="text-gray-500 font-bold text-sm uppercase tracking-wider mt-1">{item.type}</span>
              </div>
              <p className="font-medium text-gray-800 leading-relaxed mt-2 text-lg">
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
