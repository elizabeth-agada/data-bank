import about from "/img/about.png";
import Navbar from "../components/Navbar";

export default function AboutUs() {
  return (
    <div className="text-white text-center">
      <Navbar />
      <div className="grid grid-cols-1 md:grid-cols-6 md:grid-rows-2 mx-5 xl:mx-40  md:mt-28 mt-6 gap-6 lg:gap-12">
        {/* mission */}
        <div className="md:col-start-2 md:col-span-2 border border-[#2B9DDA] rounded-xl bg-[#b5b5b5] bg-opacity-30 p-3 lg:p-7">
          <div className="flex gap-3 justify-center items-center mb-4 ">
            <span className="rounded-xl p-3 h-12 w-12 border-[#6FEEFF] bg-[#b5b5b5] bg-opacity-30">
              <img src={about} alt="an icon for about us" />
            </span>
            <h3 className="font-bold text-xl lg:text-2xl">Our Mission</h3>
          </div>
          <p>
            To empower individuals and organizations by providing a secure, decentralized, and user-friendly platform for storing, managing,
            and sharing important documents.
          </p>
        </div>
        {/* Vision */}
        <div className="md:col-span-2 bg-[#b5b5b5] bg-opacity-30 border border-[#2B9DDA] rounded-xl p-3 lg:p-7">
          <div className="flex gap-3 items-center justify-center mb-4">
            <span className="rounded-xl p-3 h-12 w-12 border-[#6FEEFF] bg-[#b5b5b5] bg-opacity-30">
              <img src={about} alt="an icon for about us" />
            </span>
            <h3 className="font-bold text-xl lg:text-2xl">Our Vision</h3>
          </div>
          <p>
            To revolutionize document management by leveraging blockchain technology to create a trustless, transparent, and efficient
            system that protects user data and empowers digital identity.
          </p>
        </div>
        {/* what we do */}
        <div className="md:col-start-3 md:col-span-2 bg-[#b5b5b5] bg-opacity-30 border border-[#2B9DDA] rounded-xl p-3 lg:p-7">
          <div className="flex gap-3 justify-center items-center mb-4">
            <span className="rounded-xl p-3 h-12 w-12 border-[#6FEEFF] bg-[#b5b5b5] bg-opacity-30">
              <img src={about} alt="an icon for about us" />
            </span>
            <h3 className="font-bold text-xl lg:text-2xl">What we do</h3>
          </div>
          <p>
            Data-Bank is a decentralized document storage platform that utilizes blockchain technology to provide a secure and immutable
            solution for managing your important documents.
          </p>
        </div>
      </div>
    </div>
  );
}
