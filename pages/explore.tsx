import React, { useEffect, useState } from "react";
import useFetchMarket from "../src/hooks/useFetchMarket";
import { useMoralis } from "react-moralis";
import Moralis from "moralis/types";
import useFetchCollection from "../src/hooks/useFetchCollection";
import useBuyNFT from "../src/hooks/useBuyNFT";
import NFTTile from "../src/components/NFTTile";
import { useQuery } from "react-query";
import Link from "next/link";
import ToastSucess from "../src/components/ToastSucess";
import ToastError from "../src/components/ToastError";
import Processing from "../src/components/Processing";
import Search from "../src/components/Search";

interface marketItms {
  collectionAddress: string;
  itemId: string;
  nftAddress: string;
  owner: string;
  price: string;
  sold: boolean;
  tokenId: string;
}

interface metadata {
  description: string;
  id: string;
  image: string;
  marketId?: number;
  name: string;
  price?: string;
  address: string;
}

function Explore() {
  const [fetchItems, filterItems] = useFetchMarket();
  const { isWeb3Enabled } = useMoralis();
  const [collectionList, setCollectionList] = useState<
    Moralis.Object<Moralis.Attributes>[]
  >([]);
  const [, fetchAll] = useFetchCollection();
  const [marketItms, setMarketItms] = useState<marketItms[]>();
  const [metadata, setMetadata] = useState<metadata[]>();
  const [filtered_metadata, setfiltered_Metadata] = useState<metadata[]>();
  const [empty, setEmpty] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setisError] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [showHistory1, setShowHistory1] = useState<boolean>(true)
  const [showHistory2, setShowHistory2] = useState<boolean>(false)
  const [showHistory3, setShowHistory3] = useState<boolean>(false)


  const buy = useBuyNFT();
  const { isLoading } = useQuery("collection", {
    enabled: isWeb3Enabled,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    getItems();
  }, [isWeb3Enabled]);

  useEffect(() => {
    getCollections();
  }, [isLoading]);

  const getCollections = async () => {
    if (!isWeb3Enabled) return;
    const [_collections] = await fetchAll();
    if (!_collections) return;
    setCollectionList(_collections);
  };

  async function picklistChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const collectionName = e.target.value;
    console.log(collectionName);
    if (collectionName === "All Collections") {
      setfiltered_Metadata(metadata);
      return;
    }
    if (!marketItms || !metadata) return;
    const [_marketItms, _metadata] = filterItems(
      collectionName,
      marketItms,
      metadata
    );
    setfiltered_Metadata(_metadata);
  }
  async function displaycollection(collection_name: string) {
    const collectionName = collection_name;
    console.log(collectionName);
    if (collectionName === "All Collections") {
      setfiltered_Metadata(metadata);
      return;
    }
    if (!marketItms || !metadata) return;
    const [_marketItms, _metadata] = filterItems(
      collectionName,
      marketItms,
      metadata
    );
    setfiltered_Metadata(_metadata);
  }
  const getItems = async () => {
    if (!isWeb3Enabled) return;
    const answer = await fetchItems();
    setEmpty(!answer?.length);

    if (!answer) return;
    const [_marketItms, _metadata] = answer;
    setMarketItms(_marketItms);
    setMetadata(_metadata);
    setfiltered_Metadata(_metadata);
  };
  async function handleBuy(nftToBuy: metadata) {
    setProcessing(true);
    const callback = () => {
      setProcessing(false);
      setIsSuccess(true);
    };
    const errCallback = () => {
      setProcessing(false);
      setisError(true);
    };
    await buy({ ...nftToBuy, callback, errCallback });
  }

  return (
    <div className="pb-16">
      <p className="text-6xl font-bold text-center pb-14">
        Explore Collections
      </p>
      <div>
        <Search />
      </div>

      <div>
        <div className="m-6 p-6 text-white bg-secondary  rounded-xl w-min md:w-[885px] min-h-[1200px]">
          <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
            <li className="mr-2">
              <button
                className={
                  `inline-block p-4 rounded-t-lg bg-secondary ` +
                  (showHistory1
                    ? 'dark:hover:bg-gray-800 dark:hover:text-gray-300  '
                    : 'active dark:bg-gray-800 dark:text-blue-500') +
                  (!showHistory2
                    ? 'dark:hover:bg-gray-800 dark:hover:text-gray-300  '
                    : 'active dark:bg-gray-800 dark:text-blue-500') +
                  (!showHistory3
                    ? 'dark:hover:bg-gray-800 dark:hover:text-gray-300  '
                    : 'active dark:bg-gray-800 dark:text-blue-500')
                }
                onClick={() => { setShowHistory1(true); setShowHistory2(false); setShowHistory3(false); displaycollection("First Collection"); }}
              >
                First Collection
              </button>
            </li>
            <li className="mr-2">
              <button
                className={
                  `inline-block p-4 rounded-t-lg ` +
                  (!showHistory1
                    ? 'dark:hover:bg-gray-800 dark:hover:text-gray-300  '
                    : 'active dark:bg-gray-800 dark:text-blue-500') +
                  (!showHistory2
                    ? 'dark:hover:bg-gray-800 dark:hover:text-gray-300  '
                    : 'active dark:bg-gray-800 dark:text-blue-500') +
                  (!showHistory3
                    ? 'dark:hover:bg-gray-800 dark:hover:text-gray-300  '
                    : 'active dark:bg-gray-800 dark:text-blue-500')
                }
                onClick={() => { setShowHistory1(false); setShowHistory2(true); setShowHistory3(false); displaycollection("Second Collection"); }}
              >
                Second Collection
              </button>
            </li>
            <li className="mr-2">
              <button
                className="inline-block p-4 rounded-t-lg "
                onClick={() => { setShowHistory1(false); setShowHistory2(false); setShowHistory3(true); displaycollection("First Collection"); }}
              >
                Third  Collection
              </button>
            </li>
            <li className="mr-2">
              
                <select className={
                  "inline-block p-4 rounded-t-lg "
                }
                  
                  placeholder="All"
                  onChange={(e) => {
                    picklistChange(e);
                  }}
                >
                  <option>All collections</option>
                  {collectionList.map((collection, i) => (
                    <option key={i} value={collection.get("collectionAddress")}>
                      {collection.get("name")}
                    </option>
                  ))}
                </select>
        
            </li>
          </ul>
        </div>
      </div>


      {showHistory1 ? (
        <>
          <div className="md:flex justify-center">
            <div className="px-4" style={{ maxWidth: "1600px" }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                {filtered_metadata &&
                  filtered_metadata.map((nft, i) => (
                    <NFTTile
                      key={i}
                      nft={nft}
                      callback={handleBuy}
                      button="Buy"
                    />
                  ))}
              </div>
            </div>
          </div>
        </>
      ) : showHistory2 ? (
        <>

          {console.log("2")}
        </>
      ) : showHistory3 ? (
        <>

          {console.log("3")}
        </>
      ) : (
        <>
          <div className="md:flex justify-center">
            <div className="px-4" style={{ maxWidth: "1600px" }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                {filtered_metadata &&
                  filtered_metadata.map((nft, i) => (
                    <NFTTile
                      key={i}
                      nft={nft}
                      callback={handleBuy}
                      button="Buy"
                    />
                  ))}
              </div>
            </div>
          </div>
          )
        </>
      )}

      <Processing isOpen={processing} />

      {isSuccess && <ToastSucess isOpen={true} toggle={setIsSuccess} />}
      {isError && <ToastError isOpen={true} toggle={setisError} />}
    </div>
  );
}
export default Explore;
