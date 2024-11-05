import Navbar from "../components/Navbar";
import wallet from "/img/wallet.png";
import upload from "/img/upload.png";
import mint from "/img/mint.png";
import manage from "/img/manage.png";
import access from "/img/access.png";

export default function HowItWorks() {
  return (
    <div className="text-white">
      <Navbar />
      <section className="mx-5 lg:mx-40 xl:mx-80 md:mt-28 mt-6">
        <div className="text-center mb-6 md:mb-10">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            How <span className="text-[#2B9DDA]">Data-Bank</span> Works
          </h1>
          <p className=" text-xl">A simple and secure way to store your documents </p>
        </div>

        <div className="grid md:grid-cols-3 gap-3 md:gap-5 lg:gap-9 mb-3 md:mb-10 justify-center">
          <div>
            <div className="flex gap-3 items-center mb-4">
              <span className="rounded-xl p-3 h-12 w-12 border-[#6FEEFF] bg-[#b5b5b5] bg-opacity-30">
                <img src={wallet} alt="wallet icon" />
              </span>
              <h3 className="font-bold text-xl">Connect Your Wallet</h3>
            </div>
            <p className="ml-16 md:ml-0">
              Sign up and securely connect your Algorand wallet, such as Pera wallet and begin using Data-bank.
            </p>
          </div>
          {/* upload section */}
          <div>
            <div className="flex gap-3 md:gap-2 lg:gap-3 items-center mb-4">
              <span className="rounded-xl p-3 h-12 w-12 border-[#6FEEFF] bg-[#b5b5b5] bg-opacity-30">
                <img src={upload} alt="upload icon" />
              </span>
              <h3 className="font-bold text-xl">Upload Your Documents</h3>
            </div>
            <p className="ml-16 md:ml-0">
              Easily upload important document such as IDs, certificates, or passports, select a document type and set privacy preferences.
            </p>
          </div>
          {/* mint section */}
          <div>
            <div className="flex gap-3 items-center mb-4">
              <span className="rounded-xl p-3 h-12 w-12 border-[#6FEEFF] bg-[#b5b5b5] bg-opacity-30">
                <img src={mint} alt="mint icon" />
              </span>
              <h3 className="font-bold text-xl">Mint as NFTs </h3>
            </div>
            <p className="ml-16 md:ml-0">Each document is securely minted as a unique NFT ensuring authenticity and immutability.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-6 gap-3 md:gap-5 lg:gap-9 justify-center">
          {/* manage section */}
          <div className="md:col-start-2 md:col-span-2">
            <div className="flex gap-3 items-center mb-4">
              <span className="rounded-xl p-3 h-12 w-12 border-[#6FEEFF] bg-[#b5b5b5] bg-opacity-30">
                <img src={manage} alt="manage icon" />
              </span>
              <h3 className="font-bold text-xl">Manage and Share</h3>
            </div>
            <p className="ml-16 md:ml-0">Organize your document in your dashboard and share them securely with others as needed.</p>
          </div>
          {/* access section  */}
          <div className="md:col-start-4 md:col-span-2">
            <div className="flex gap-3 items-center mb-4">
              <span className="rounded-xl p-3 h-12 w-12 border-[#6FEEFF] bg-[#b5b5b5] bg-opacity-30">
                <img src={access} alt="access icon" />
              </span>
              <h3 className="font-bold text-xl">Access anytime</h3>
            </div>
            <p className="ml-16 md:ml-0">Access your document from any device, anytime, with complete control over who sees them.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
