const { expect } = require("chai");
// const { ethers, upgrades } = require("hardhat");
// const { MerkleTree } = require("merkletreejs");
// const keccak256 = require("keccak256");


describe("WhitelistSale", () => {
    before(async () => {
        //     accounts = await ethers.getSigners();
        //     [user, add1, add2, add3, add4, add5, add6, add7, add8, _] = accounts;

        const [owner] = await ethers.getSigners();

        WhitelistSale = await ethers.getContractFactory("WhitelistSale");

        whitelistSale = await WhitelistSale.deploy("0x15e1a54af0c562685bc619b9b770a503b272a845a0a8451f6c4265802a44eca4");

        await whitelistSale.deployed();

        console.log("WhitelistSale deployed to", whitelistSale.address);
    });

    describe("Testing", () => {
        it("Should check working", async () => {
            console.log("WhitelistSale deployed to", whitelistSale.address);
        })
    })
});
