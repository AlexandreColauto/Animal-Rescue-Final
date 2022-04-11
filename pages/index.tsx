import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className="bg-secondary pb-16">
      <div className="flex p-10 justify-between h-10/12 items-center leading-loose ">
        <div>
          <p className="text-7xl font-bold ">
            This is the template <br />
            of our <span className="text-white">NFT Marketplace</span>
          </p>
          <p className="text-[#2c5878] mt-8 font-thin text-lg">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&apos;s standard
            <br />
            dummy text ever since the 1500s, when an unknown printer
            <br />
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industrys standard
            <br /> dummy text ever since the 1500s, when an unknown printer
            <br />
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&apos;s standard
            <br />
          </p>
          <div className="mt-10">
            <Link href="/explore">
              <button className="bg-primary text-white py-2 px-8 font-bold rounded-2xl hover:bg-normal">
                Explore Collections
              </button>
            </Link>
            <button className="text-primary  py-2 px-8 font-bold rounded-2xl hover:text-white">
              Info/About
            </button>
          </div>
        </div>
        <div>
          <Image src="/logo.png" alt="logo" width="380" height="380" />
        </div>
      </div>
    </div>
  );
};

export default Home;
