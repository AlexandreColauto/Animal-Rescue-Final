import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faYoutube,
  faFacebook,
  faTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";

function Footer() {
  return (
    <div>
      <div className="h-80 bg-primary align-center flex justify-center flex-col">
        <div className="p-5">
          <ul>
            <div className="flex text-white justify-around">
              <li>
                <Link href="/create">
                  <p className="text-white cursor-pointer hover:drop-shadow hover:scale-105">
                    Cat Rescue NFTs
                  </p>
                </Link>
              </li>
              <li>
                <Link href="/create">
                  <p className="text-white cursor-pointer hover:drop-shadow hover:scale-105">
                    Famous Cats
                  </p>
                </Link>
              </li>
              <li>
                <Link href="/create">
                  <p className="text-white cursor-pointer hover:drop-shadow hover:scale-105">
                    House Cats
                  </p>
                </Link>
              </li>
              <li>
                <Link href="/create">
                  <p className="text-white cursor-pointer hover:drop-shadow hover:scale-105">
                    All
                  </p>
                </Link>
              </li>
              <li>
                <div className="flex text-white justify-between w-200">
                  <Link href="/">
                    <FontAwesomeIcon
                      icon={faYoutube}
                      className="mx-2 cursor-pointer hover:drop-shadow hover:scale-105"
                    />
                  </Link>
                  <Link href="/">
                    <FontAwesomeIcon
                      icon={faFacebook}
                      className="mx-2 cursor-pointer hover:drop-shadow hover:scale-105"
                    />
                  </Link>
                  <Link href="/">
                    <FontAwesomeIcon
                      icon={faTwitter}
                      className="mx-2 cursor-pointer hover:drop-shadow hover:scale-105"
                    />
                  </Link>
                  <Link href="/">
                    <FontAwesomeIcon
                      icon={faLinkedin}
                      className="mx-2 cursor-pointer hover:drop-shadow hover:scale-105"
                    />
                  </Link>
                </div>
              </li>
            </div>
          </ul>
        </div>
        <div className="p-5">
          <ul>
            <div className="flex text-white justify-around">
              <li className="text-xl font-bold">
                {" "}
                <p className="text-white">+321 123 4567</p>
              </li>
              <li className="text-xl font-bold text-white">
                <p className="text-white">info@example.com </p>
              </li>
              <li>
                <div>
                  <p className="text-secondary">32nd Ave, Wheat Ridge </p>
                  <p className="text-white">Denver, USA</p>
                </div>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;
