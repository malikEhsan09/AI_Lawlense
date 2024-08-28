import { AnimatedTooltipPreview } from "./CustomAnimatedTooltip";

const TeamSection = () => {
  return (
    <>
    <section className="bg-[#121212]  py-12">
      <div className="container mx-auto text-center">
        <h2 className="text-white text-4xl font-bold mb-6">Our Team</h2>
        <div className="flex justify-center space-x-4">
          <AnimatedTooltipPreview/>
        </div>
      </div>
    </section>
    <hr className="border-t border-gray-700 mx-auto w-11/12 md:w-3/4 bg-black" />
    </>
  );
};

export default TeamSection;
