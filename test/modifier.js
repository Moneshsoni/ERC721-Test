const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Modifier", async () => {

    before(async () => {

        accounts = await ethers.getSigners();

        const Modifier = await ethers.getContractFactory("FunctionModifier");
        modifier = await Modifier.deploy();
        await modifier.deployed();
    });

    describe("Modifier  test ", async () => {

        it("Should check the modifier decimals", async () => {
            let decimal = await modifier.x();
            expect(await modifier.x()).to.equal(decimal);
        });

        it("Should check the changeOwner",async()=>{
            expect(await modifier.changeOwner(accounts[0].address));
            let own = await modifier.owner();
            console.log("New owner: " + own);
        })

        it("Should check onlly owner can change address", async () => {
            await expect(modifier.connect(accounts[3]).changeOwner("0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2")).to.be.revertedWith("Not a owner");
        })

        it("Shoul check the valid address not authorized",async()=>{
            await expect(modifier.connect(accounts[0]).changeOwner("0x0000000000000000000000000000000000000000")).to.be.revertedWith("Not valid address");
        })

    });
});