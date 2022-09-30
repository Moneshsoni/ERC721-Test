// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
 const ERC721Collection = await hre.ethers.getContractFactory("ERC721Collection");
 const eRC721Collection = await  ERC721Collection.deploy()
 await eRC721Collection.deployed();
 console.log("Address of collection!",eRC721Collection.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// collection address! 0x931c9416C3d915580e68D8FB4124F17E8B70D917

//Collection verify address! https://mumbai.polygonscan.com/address/0x931c9416C3d915580e68D8FB4124F17E8B70D917#code
