//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";

contract NFTMarket is ERC1155Holder, ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _itemIds;
    Counters.Counter private _itemsSold;
    address payable private feeWallet;

    constructor(address payable _feeWallet) {
        feeWallet = _feeWallet;
    }

    struct MarketItem {
        uint256 itemId;
        address nftAddress;
        address collectionAddress;
        uint256 tokenId;
        address payable owner;
        uint256 price;
        bool sold;
    }

    event MarketItemCreated(
        uint256 indexed itemId,
        address indexed nftContract,
        address collectionAddress,
        uint256 indexed tokenId,
        address owner,
        uint256 price,
        bool sold
    );
    mapping(uint256 => MarketItem) private idToMarketItem;

    function ListNFT(
        address NFTaddress,
        address collectionAddress,
        uint256 id,
        uint256 price
    ) public nonReentrant {
        ERC1155 nft = ERC1155(NFTaddress);
        require(
            nft.balanceOf(msg.sender, id) > 0,
            "You can only list your own nfts"
        );
        _itemIds.increment();
        uint256 itemId = _itemIds.current();
        idToMarketItem[itemId] = MarketItem(
            itemId,
            NFTaddress,
            collectionAddress,
            id,
            payable(msg.sender),
            price,
            false
        );
        nft.safeTransferFrom(msg.sender, address(this), id, 1, "");
        emit MarketItemCreated(
            itemId,
            NFTaddress,
            collectionAddress,
            id,
            msg.sender,
            price,
            false
        );
    }

    function fetchAllCollection() public view returns (MarketItem[] memory) {
        uint256 totalItems = _itemIds.current();
        uint256 leftItems = _itemIds.current() - _itemsSold.current();
        uint256 currentIndex = 0;

        MarketItem[] memory items = new MarketItem[](leftItems);

        for (uint256 i = 0; i < totalItems; i++) {
            if (!idToMarketItem[i + 1].sold) {
                items[currentIndex] = idToMarketItem[i + 1];
                currentIndex += 1;
            }
        }
        return items;
    }

    function performATransaction(uint256 itemId) public payable nonReentrant {
        MarketItem storage item = idToMarketItem[itemId];
        require(
            item.sold == false,
            "The item has already been sold, try another item."
        );
        require(msg.value == item.price, "Please send the correct amount.");
        ERC1155 nft = ERC1155(item.nftAddress);
        nft.safeTransferFrom(address(this), msg.sender, item.tokenId, 1, "");
        uint256 fee = (item.price * 25) / 1000;
        payable(item.owner).transfer(item.price - fee);
        feeWallet.transfer(fee);
        item.owner = payable(msg.sender);
        item.sold = true;
        _itemsSold.increment();
    }
}
