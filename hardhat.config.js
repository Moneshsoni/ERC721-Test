require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity:
  {
    compilers:[
      {
        version: "0.8.0",
      },
      {
        version: "0.8.1",
      },
      {
        version: "0.8.4",
      }
    ]

  },
  networks:{
    mumbai:{
      url: process.env.ALCHEMY_MUMBAI_URL,
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: {
      polygonMumbai: 'T6ZRYP4Z6EM2QXUC8C4HCYIDWNSAAB4YZQ'
    }
  }
};