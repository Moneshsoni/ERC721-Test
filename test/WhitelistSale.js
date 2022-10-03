const { expect } = require("chai");
const { ethers } = require("hardhat");
const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');

describe("Collection", function () {

  let whitelist = [];
  let leafNodes;
  let root;
  let collection;
  let proof;

  before(async function () {

    accounts = await ethers.getSigners();
    whitelist.push(accounts[0].address)
    whitelist.push(accounts[1].address)
    whitelist.push(accounts[2].address)
    whitelist.push(accounts[3].address)
    leafNodes = whitelist.map((node) => keccak256(node));

    const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });

    root = merkleTree.getHexRoot().toString();
    console.log(root);
    proof = merkleTree.getHexProof(leafNodes[2])

    const Collection = await ethers.getContractFactory("Collection");
    collection = await Collection.deploy();
    await collection.deployed();
  });

  describe("Collection minting test ", async function () {

    it("Should set root hash", async function () {

      const tx = await collection.connect(accounts[0]).setMerkleRoot(root);
      await tx.wait();

      expect(await collection.merkleRoot()).to.equal(root);

    });

    it("Should mint NFTs via whitelsit ", async function () {
      const tx = await collection.connect(accounts[2]).mint("hello world", proof);
      expect(await collection.ownerOf(1)).to.equal(accounts[2].address);

    });

    it("Should not mint NFTs via  whitelsit with non vaild proofs ", async function () {
      await expect(collection.connect(accounts[1]).mint("hello world", proof)).to.be.revertedWith('user is not verify');
    });

    it("Should not mint NFTs via  non whitelsit  ", async function () {

      await expect(collection.connect(accounts[5]).mint("hello world", proof)).to.be.revertedWith('user is not verify');

    });


  });

});