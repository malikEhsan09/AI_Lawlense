import { FaGavel, FaBalanceScale, FaRobot } from "react-icons/fa";

const FeaturesSection = () => {
  return (
    <>
      <section className="bg-[#121212] text-white py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Features We Provide</h2>

          <div className="relative flex justify-between items-center gap-8">
            {/* Card 1 */}
            <div className="p-8 bg-[#1A1A1A] rounded-xl shadow-2xl flex-1">
              <div className="flex justify-center mb-4">
                <FaGavel className="text-[#1e9e64d2] text-5xl" />
              </div>
              <h3 className="text-xl font-bold mb-4">1. Instant Legal Insights</h3>
              <p>
                Get immediate access to laws, cases, and legal precedents tailored to your queries,
                empowering you with the knowledge to make informed decisions.
              </p>
            </div>

            {/* Dotted Line between Cards */}
            <div className="hidden md:flex items-center justify-center">
             <span className="block w-16 border-t-2 border-gray-400 border-dashed"></span>

            </div>

            {/* Card 2 */}
            <div className="p-8 bg-[#1A1A1A] rounded-xl shadow-2xl flex-1">
              <div className="flex justify-center mb-4">
                <FaBalanceScale className="text-[#1e9e64d2] text-5xl" />
              </div>
              <h3 className="text-xl font-bold mb-4">2. Streamlined Decision-Making</h3>
              <p>
                Enhance your legal work with AI-driven references and draft suggestions,
                reducing the workload on judges and lawyers while ensuring informed decisions.
              </p>
            </div>

            {/* Dotted Line between Cards */}
            <div className="hidden md:flex items-center justify-center">
            <span className="block w-16 border-t-2 border-gray-400 border-dashed"></span>

            </div>

            {/* Card 3 */}
            <div className="p-8 bg-[#1A1A1A] rounded-xl shadow-2xl flex-1">
              <div className="flex justify-center mb-4">
                <FaRobot className="text-[#1e9e64d2] text-5xl" />
              </div>
              <h3 className="text-xl font-bold mb-4">3. Future-Ready Legal Solutions</h3>
              <p>
                Prepare for the future with AI-powered Alternative Dispute Resolution,
                offering quick, efficient resolutions to legal disputes outside of court.
              </p>
            </div>
          </div>
        </div>
      </section>
      <hr className="border-t border-gray-700 mx-auto w-11/12 md:w-3/4 bg-black" />
    </>
  );
};

export default FeaturesSection;
