//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Collection is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    bytes32 public merkleRoot;

    constructor() ERC721("MY-NFT Collection", "MYNFT") {}

    function setMerkleRoot(bytes32 _root) public onlyOwner {
        merkleRoot = _root;
    }

    function mint(string memory tokenURI, bytes32[] calldata proof)
        public
        returns (uint256)
    {
        bytes32 leaf = keccak256(abi.encodePacked(msg.sender));
        require(
            MerkleProof.verify(proof, merkleRoot, leaf),
            "user is not verify"
        );
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        return newItemId;
    }
}

// ["0x8eac4673aea45f493f1775d2ee9cc40555812cdb5d8a2c5802857c32686d6a52","0x8eac4673aea45f493f1775d2ee9cc40555812cdb5d8a2c5802857c32686d6a52","0x8eac4673aea45f493f1775d2ee9cc40555812cdb5d8a2c5802857c32686d6a52"]
