import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import axios from "axios";
import useFetchCollection from "./useFetchCollection";
import Moralis from "moralis/types";
import NFT from "../../artifacts/contracts/NFT.sol/NFT.json";

interface metadata {
  address: string;
  collection?: string;
  description: string;
  id: string;
  image: string;
  name: string;
  price?: string;
  marketId?: number;
}
function useLoadNFTs() {
  const Web3Api = useMoralisWeb3Api();
  const [, _fetch] = useFetchCollection();
  const { isAuthenticated, Moralis, chainId, web3, isWeb3Enabled } =
    useMoralis();

  const fetchNFTs = async (): Promise<
    | [metadata[], Moralis.Object<Moralis.Attributes>[], boolean]
    | [undefined, undefined, boolean]
  > => {
    const useraddress = Moralis.account;
    const chainId = Moralis.chainId;
    const [collections, addressDic, loading] = await _fetch();

    if (!useraddress || !collections) return [, , loading];

    const options: typeof Moralis.Web3API.account.getNFTsForContract.arguments =
      {
        chain: chainId,
        address: useraddress,
      };
    const _userNFTsCollections = await Moralis.Web3API.account.getNFTs(options);
    if (!_userNFTsCollections) return [, , loading];
    if (!_userNFTsCollections.result) return [, , loading];
    const userNFTsCollections = _userNFTsCollections.result.filter((nft) => {
      return Object.keys(addressDic).includes(nft.token_address.toLowerCase());
    });
    const nftsMeta: metadata[] = [];
    const fetchTokenuri = async (address: string, token_id: string) => {
      if (!web3) return;
      const ethers = Moralis.web3Library;
      const signer = web3.getSigner();
      const tokenContract = new ethers.Contract(
        address,
        NFT.abi,
        signer.provider
      );
      const url = await tokenContract.uri(token_id);
      return url;
    };
    await Promise.all(
      userNFTsCollections.map(async (nft) => {
        try {
          const token_uri = await fetchTokenuri(
            nft.token_address,
            nft.token_id
          );
          const metadata = await axios.get(token_uri);
          metadata.data.collection = addressDic
            ? addressDic[nft.token_address]
            : "";
          metadata.data.address = nft.token_address;
          metadata.data.id = nft.token_id;
          nftsMeta.push(metadata.data);
        } catch (err: any) {
          console.log(err.message);
          const dataPlaceHolder = {
            address: nft.token_address,
            id: nft.token_id,
            description: "Not Available",
            image: "/logo.png",
            name: "Not Available",
          };
          return dataPlaceHolder;
        }
      })
    );

    return [nftsMeta, collections, loading];
  };
  return fetchNFTs;
}

export type { metadata };

export default useLoadNFTs;
