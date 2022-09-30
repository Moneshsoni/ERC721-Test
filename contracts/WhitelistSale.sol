// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract WhitelistSale is ERC721 {
  bytes32 immutable public merkleRoot;
  uint256 public nextTokenId;
  mapping(address => bool) public claimed;

  constructor(bytes32 _merkleRoot) ERC721("Test", "NFT") {
    merkleRoot = _merkleRoot;
  }

  function toBytes32(address addr) pure internal returns (bytes32) {
    return bytes32(uint256(uint160(addr)));
  }

  function mint(bytes32[] calldata merkleProof) public payable {
    require(claimed[msg.sender] == false, "already claimed");
    claimed[msg.sender] = true;
    require(MerkleProof.verify(merkleProof, merkleRoot, toBytes32(msg.sender)) == true, "invalid merkle proof");
    nextTokenId++;
    _mint(msg.sender, nextTokenId);
  }
}