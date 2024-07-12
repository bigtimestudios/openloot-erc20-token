const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("OpenLootToken", function () {
  let OpenLootToken;
  let openLootToken;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    OpenLootToken = await ethers.getContractFactory("OpenLootToken");
    openLootToken = await OpenLootToken.deploy("Open Loot", "OPENLOOT", 1000000, owner.address);
    await openLootToken.deployed();
  });

  it("Should initialize with the correct name, symbol, and total supply", async function () {
    expect(await openLootToken.name()).to.equal("Open Loot");
    expect(await openLootToken.symbol()).to.equal("OPENLOOT");
    expect(await openLootToken.totalSupply()).to.equal(ethers.utils.parseUnits("1000000", 18));
  });

  it("Should assign the total supply of tokens to the owner", async function () {
    const ownerBalance = await openLootToken.balanceOf(owner.address);
    expect(await openLootToken.totalSupply()).to.equal(ownerBalance);
  });

  it("Should allow transfers between accounts", async function () {
    await openLootToken.transfer(addr1.address, ethers.utils.parseUnits("1000", 18));
    const addr1Balance = await openLootToken.balanceOf(addr1.address);
    expect(addr1Balance).to.equal(ethers.utils.parseUnits("1000", 18));

    await openLootToken.connect(addr1).transfer(addr2.address, ethers.utils.parseUnits("500", 18));
    const addr2Balance = await openLootToken.balanceOf(addr2.address);
    expect(addr2Balance).to.equal(ethers.utils.parseUnits("500", 18));
  });

  it("Should fail if sender doesn’t have enough tokens", async function () {
    const initialOwnerBalance = await openLootToken.balanceOf(owner.address);
    await expect(openLootToken.connect(addr1).transfer(owner.address, ethers.utils.parseUnits("1", 18)))
      .to.be.revertedWith("ERC20InsufficientBalance");
    expect(await openLootToken.balanceOf(owner.address)).to.equal(initialOwnerBalance);
  });
});