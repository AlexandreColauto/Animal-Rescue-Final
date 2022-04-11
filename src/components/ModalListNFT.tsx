import React, { Fragment, useEffect, useState } from "react";
import useListNft from "../hooks/useListNFT";
import { Dialog, Transition } from "@headlessui/react";
import type { metadata } from "../hooks/useLoadNFTs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import Processing from "./Processing";

type props = {
  NFTToList: metadata;
  toggle: () => void;
  isOpen: boolean;
  setSuccessMessage: (arg: boolean) => void;
  setErrorMessage: (arg: boolean) => void;
};

function ModalListNFT(props: props) {
  const [processing, setProcessing] = useState(false);
  const [nftPrice, setNftPrice] = useState("");
  const [isOpen, setOpen] = useState(props.isOpen);
  const { NFTToList, toggle, setSuccessMessage, setErrorMessage } = props;
  const list = useListNft();

  useEffect(() => {
    setOpen(props.isOpen);
    console.log(processing);
  }, [props.isOpen]);

  const handleListing = (NFT: metadata) => {
    setProcessing(true);
    console.log(processing);
    const callback = () => {
      toggle();
      setProcessing(false);
      setSuccessMessage(true);
      setTimeout(function () {
        setSuccessMessage(false);
      }, 5000);
    };
    const errCallback = () => {
      toggle();
      setProcessing(false);
      setErrorMessage(true);
      setTimeout(function () {
        setErrorMessage(false);
      }, 5000);
    };
    const options = {
      collectionAddr: NFT.address,
      id: NFT.id,
      nftPrice,
      callback,
      errCallback,
    };
    try {
      list(options);
    } catch (err) {
      console.log(err);
      setProcessing(false);
    }
  };

  return (
    <div className="">
      <Dialog
        open={true}
        as="div"
        className="fixed inset-0 z-25  overflow-y-auto"
        onClose={() => null}
      >
        <div className="flex p-10 border relative justify-center mt-6 bg-slate-100 w-8/12 md:w-5/12 mx-auto rounded-xl">
          <button type="button" onClick={props.toggle}>
            <div className="absolute top-5 right-5">
              <FontAwesomeIcon icon={faCircleXmark} className="text-normal" />
            </div>
          </button>
          <div className="relative w-8/12">
            <Dialog.Title
              as="p"
              className="text-3xl mt-4  leading-6 font-strong text-gray-900"
            >
              List Your NFT
            </Dialog.Title>
            <p className="title mt-4 is-4">Do you want to list this NFT?</p>
            <br />
            <img
              src={NFTToList?.image}
              alt={NFTToList?.name}
              className="w-60 h-60 rounded object-cover"
            />
            <p className="text-lg">{NFTToList?.name}</p>
            <br />
            <div className="flex items-center">
              <label className="mr-4">Item&nbsp;Price</label>
              <div className="control">
                <input
                  className="w-full py-2 px-3 rounded"
                  type="text"
                  placeholder="1000"
                  onChange={(e) => setNftPrice(e.target.value)}
                />
              </div>
            </div>
            <div className="bg-slate-100 text-white px-4 py-3 sm:px-6 sm:flex justify-center">
              <button
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-secondary text-white  font-medium  hover:bg-primary hover:text-white sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={props.toggle}
              >
                Cancel
              </button>
              <button
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-secondary text-white font-medium  hover:bg-primary sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={() => handleListing(NFTToList)}
              >
                List
              </button>
            </div>
          </div>
        </div>
      </Dialog>
      <Processing isOpen={processing} />
    </div>
  );
}

export default ModalListNFT;
