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
        className="flex px-10 py-7 drop-shadow items-center"
        role="navigation"
        aria-label="main navigation"
        style={{ boxShadow: "0px 15px 30px rgba(62, 19, 77, 0.09)" }}
      >
        <div className=" mr-10"></div>
        <div className="">
          <Link href="/">
            <p className="text-3xl font-black cursor-pointer">
              Bitcoin For Cats.
            </p>
          </Link>
        </div>
        <div className="ml-auto">
          <Link href="/explore">
            <p className="mx-6 mt-1 font-bold cursor-pointer hover:drop-shadow hover:scale-105">
              Explore
            </p>
          </Link>
        </div>
        <Link href="/create">
          <p className="mx-6 mt-1 font-bold cursor-pointer hover:drop-shadow hover:scale-105">
            Create
          </p>
        </Link>
        <button
          className="mx-6 mt-1 cursor-pointer hover:drop-shadow hover:scale-105"
          onClick={login}
        >
          <span className="w-25">
            <FontAwesomeIcon icon={faWallet} className="w-6 h-6" />
          </span>
        </button>
        <Link href="/creatorsdashboard">
          <div className="mx-6 cursor-pointer hover:drop-shadow hover:scale-105">
            <span className="icon">
              <FontAwesomeIcon icon={faCat} className="w-7 h-7" />
            </span>
          </div>
        </Link>
        <div className=" ml-2"></div>
        <div></div>
      </nav>
    </div>
  );
};

export default Header;
