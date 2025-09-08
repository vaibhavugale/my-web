const Footer = () => {
  return (
    <div className="  p-3 pb-10 flex  bg-neutral-800 text-white rounded  ">
      <div className="flex-1 ">
        <p className="  font-light mb-5 text-center text-3xl">Contact Here</p>
        <div className="flex flex-col md:flex-row justify-center gap-3">
          <p>Email : ugalevaibhav00@gmail.com</p>
          <p className="hidden md:block">|</p>
          <p>Linkiedn : www.linkedin.com/in/vaibhavugale-959aa2217 </p>
          <p className="hidden md:block">|</p>
          <p>Mobile: +91 9370141891</p>
        </div>
      </div>
      {/* <div className="flex flex-1 gap-3 flex-col">
        <textarea
          className="w-full p-4 rounded focus:ring-0 focus:outline-0 focus:border-0 bg-white text-black border"
          rows={6}
        />
        <button className="tracking-wider cursor-pointer  bg-white text-neutral-800 font-semibold rounded px-4 py-3 outline-none border-none ">
          Send Message
        </button>
      </div> */}
    </div>
  );
};

export default Footer;
