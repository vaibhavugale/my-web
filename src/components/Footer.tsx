const Footer = () => {
  return (
    <footer className="border-t border-[#ececeb] bg-white py-12 mt-16 w-full">
      <div className="max-w-[860px] mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-[#787774]">
        <div className="flex items-center gap-2">
          <span>⚡</span>
          <span className="font-medium text-[#37352f]">Vaibhav Ugale</span>
          <span>•</span>
          <span>Software Engineer</span>
        </div>
        
        <div className="flex items-center gap-4">
          <a href="mailto:ugalevaibhav00@gmail.com" className="hover:text-[#37352f] transition-colors">
            Email
          </a>
          <a href="https://www.linkedin.com/in/vaibhavugale-959aa2217" target="_blank" rel="noopener noreferrer" className="hover:text-[#37352f] transition-colors">
            LinkedIn
          </a>
          <a href="https://github.com/vaibhavugale" target="_blank" rel="noopener noreferrer" className="hover:text-[#37352f] transition-colors">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
