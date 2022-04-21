import React from "react";
import type { metadata } from "../hooks/useLoadNFTs";

interface props {
  nft: metadata;
  callback: (nft: metadata) => void;
  button: string;
}

function NFTTile(props: props) {
  const { nft, callback, button } = props;
  return (
    <div>
      <div className="border-1 mt-7 bg-secondary shadow-lg border-gray-300 rounded-xl overflow-hidden">
        <img className="object-cover border-b-2 border-white w-60 h-60 rounded-t " src={nft.image} />
        <div className="flex flex-col justify-between">
          <div className="p-4 mx-2">
            <p className="text-3xl text-primary my-1 font-semibold">{nft.name}</p>
            <div>
              <p className="text-white text-lg font-semibold">
                {nft.description ? nft.description : <br />}
              </p>
            </div>
            <br />
            <div className="flow float-right">
            {nft.price && <p>{nft.price} BNB </p>}
            </div>
          </div>
          <div className="p-3 bg-transparent">
            <button
              className="w-full bg-primary hover:bg-white text-white hover:text-primary cursor-pointer font-bold py-3 px-12 rounded-xl"
              onClick={() => {
                callback(nft);
              }}
            >
              {button}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NFTTile;
