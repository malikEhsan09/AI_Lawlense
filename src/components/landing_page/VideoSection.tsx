const VideoSection = () => {
  return (
    <>
    <section className="bg-[#121212] text-white py-10">
      <div className="container mx-auto flex justify-center">
        <div className="w-full max-w-4xl">
          <div className="relative">
            <video className="w-full rounded-lg shadow-lg" controls>
              <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 flex justify-center items-center">
              <div className="w-16 h-16 bg-[#0a7947d2] rounded-full flex justify-center items-center hover:cursor-pointer">
                <span className="text-white text-2xl font-bold" >▶</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <hr className="border-t border-gray-700 mx-auto w-11/12 md:w-3/4 bg-black" />
    </>
  );
};

export default VideoSection;
