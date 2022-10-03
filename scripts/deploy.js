// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
 const WhitelistSale = await hre.ethers.getContractFactory("WhitelistSale");
 const whitelistSale = await  WhitelistSale.deploy("0x15e1a54af0c562685bc619b9b770a503b272a845a0a8451f6c4265802a44eca4");
 await whitelistSale.deployed();
 console.log("Address of WhitelistSale ERC721! ",whitelistSale.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  proce``ss.exitCode = 1;
});

// Address of WhitelistSale ERC721!  0x846A0b383B474Fe3511471008328194e33d8579B

//Collection verify address! https://mumbai.polygonscan.com/address/0x1C2896Ed9A37B5eE763Fa68f4328bc86EE0a0fba#code
