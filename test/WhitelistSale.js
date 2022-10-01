const { expect, use } = require("chai");
const { ethers } = require("hardhat");
const { MerkleTree } = require("merkletreejs");
const { keccak256 } = ethers.utils;

use(require("chai-as-promised"));

describe('Test Contract', function () {
  before(function () {
    // runs once before the first test in this block
    const accounts = await hre.ethers.getSigners();
    const whitelisted = accounts.slice(0, 5);
    const notWhitelisted = accounts.slice(5, 10);
    const padBuffer = (addr) => {
      return Buffer.from(addr.substr(2).padStart(32 * 2, 0), "hex");
    };
    const leaves = whitelisted.map((account) => padBuffer(account.address));
    const tree = new MerkleTree(leaves, keccak256, { sort: true });
    const merkleRoot = tree.getHexRoot();
    const WhitelistSale = await ethers.getContractFactory("WhitelistSale");
    const whitelistSale = await WhitelistSale.deploy(merkleRoot);
    await whitelistSale.deployed();
    const merkleProof = tree.getHexProof(padBuffer(whitelisted[0].address));
    const invalidMerkleProof = tree.getHexProof(
      padBuffer(notWhitelisted[0].address)
    );
  });

  describe("whitelist", function(){

    it("allready claimed",async () =>{
      await expect(whitelistSale.mint(merkleProof)).to.not.be.rejected;
      await expect(whitelistSale.mint(merkleProof)).to.be.rejectedWith(
      "already claimed");
    });
    
    it("Invalid merkle proof",async ()=>{
      await expect(
        whitelistSale.connect(notWhitelisted[0]).mint(invalidMerkleProof)
    }),

  });

});
  
   // test cases
