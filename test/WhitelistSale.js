const { expect } = require("chai");
const { MerkleTree } = require("merkletreejs");
const keccak256 = require('keccak256');

describe('Test Contract',async () => {
  before(async () => {
    
    accounts = await ethers.getSigners();
    [user, add1, add2, add3, _] = accounts;
     WhitelistSale = await hre.ethers.getContractFactory("WhitelistSale");
     whitelistSale = await  WhitelistSale.deploy("0x15e1a54af0c562685bc619b9b770a503b272a845a0a8451f6c4265802a44eca4");
    await whitelistSale.deployed();
    // console.log("Address of WhitelistSale ERC721! ",whitelistSale.address);
  
  });

  describe("Test cases for merkle tree",() =>{
    it("Should check", async () =>{

      console.log("WhitelistSale >>>>",whitelistSale.name());
    })
    


  } )

});
  
   // test cases
