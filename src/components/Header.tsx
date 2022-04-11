import React, { useState, useEffect } from "react";
import Link from "next/link";
const Moralis = require("moralis");
import { useMoralis } from "react-moralis";
import { NextPage } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet, faCat } from "@fortawesome/free-solid-svg-icons";

const Header: NextPage = () => {
  const marketAddress = "0x47bB10F98034Ba0b06037601106b0793972816BD";
  const {
    authenticate,
    isAuthenticated,
    user,
    isWeb3Enabled,
    enableWeb3,
    web3,
  } = useMoralis();

  useEffect(() => {
    tryWeb3();
  }, []);

  const tryWeb3 = () => {
    !isWeb3Enabled && !isAuthenticated ? enableWeb3() : null;
  };
  async function login() {
    console.log(isAuthenticated);
    tryWeb3();
    if (!user) {
      const user = await authenticate({
        signingMessage: "Log in using Moralis",
      });
    }
  }

  return (
    <div>
      <nav
        className="fix px-10 py-7 w-full float-right items-center"
        role="navigation"
        aria-label="main navigation"

      >
        <div id="general_menu" className=" float-right align-middle mb-3 ">
          <div className="text-md flex items-center lg:flex-grow">
          <a href="/explore" className="block lg:inline-block  text-primary bg-white p-2 rounded-md mr-4 hover:drop-shadow hover:scale-105">
              <Link href="/explore">
                <p className="mx-6 font-bold cursor-pointer ">
                  Explore
                </p>
              </Link>
            </a>
            <a href="/create" className="block lg:inline-block text-primary bg-white p-2 rounded-md mr-4 hover:drop-shadow hover:scale-105">
              <Link href="/create">
                <p className="mx-6 font-bold cursor-pointer ">
                  Create
                </p>
              </Link>
            </a>
            <a href="#responsive-header" className="block lg:inline-block text-primary">
              <button
                className="mx-6 cursor-pointer hover:drop-shadow hover:scale-105"
                onClick={login}
              >
                <span className="w-25">
                  <FontAwesomeIcon icon={faWallet} className="w-8 h-8 bg-white p-2 rounded-md" />
                </span>
              </button>
            </a>
            <a href="#responsive-header" className="block lg:inline-block  text-primary">
              <Link href="/creatorsdashboard">
                <div className="mx-6 cursor-pointer hover:drop-shadow hover:scale-105">
                  <span className="icon">
                    <FontAwesomeIcon icon={faCat} className="w-8 h-8 bg-white p-2 rounded-md" />
                  </span>
                </div>
              </Link>
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
