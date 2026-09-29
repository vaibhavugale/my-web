const Footer = () => {
  return (
    <div className="border-t-2 border-black bg-white p-8 md:p-12 mt-20 w-full">
      <div className="max-w-[1024px] mx-auto flex flex-col items-center">
        <h2 className="text-3xl md:text-5xl font-black uppercase mb-8 tracking-tight">Get In Touch</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="mailto:ugalevaibhav00@gmail.com" className="brutal-btn !bg-[#FFD700] !text-black hover:!bg-black hover:!text-white">
            Email Me
          </a>
          <a href="https://www.linkedin.com/in/vaibhavugale-959aa2217" target="_blank" rel="noopener noreferrer" className="brutal-btn !bg-[#2cd4fe] !text-black hover:!bg-black hover:!text-white">
            LinkedIn
          </a>
          <a href="https://github.com/vaibhavugale" target="_blank" rel="noopener noreferrer" className="brutal-btn !bg-[#FF90E8] !text-black hover:!bg-black hover:!text-white">
            Github
          </a>
        </div>
        <div className="mt-12 font-mono font-bold text-sm uppercase tracking-widest text-gray-500">
          © {new Date().getFullYear()} Vaibhav Ugale
        </div>
      </div>
    </div>
  );
};

export default Footer;
