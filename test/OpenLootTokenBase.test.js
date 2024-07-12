const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("OpenLootTokenBase", function () {
  let OpenLootTokenBase;
  let openLootTokenBase;
  let owner;
  let bridge;
  let addr1;
  let addr2;
  const remoteTokenAddress = "0x1234567890123456789012345678901234567890"; // Dummy address

  beforeEach(async function () {
    [owner, bridge, addr1, addr2] = await ethers.getSigners();
    OpenLootTokenBase = await ethers.getContractFactory("OpenLootTokenBase");
    openLootTokenBase = await OpenLootTokenBase.deploy(
      bridge.address,
      remoteTokenAddress,
      "Open Loot Base",
      "OPENLOOTB"
    );
    await openLootTokenBase.deployed();
  });

  it("Should initialize with the correct name, symbol, bridge and remote token address", async function () {
    expect(await openLootTokenBase.name()).to.equal("Open Loot Base");
    expect(await openLootTokenBase.symbol()).to.equal("OPENLOOTB");
    expect(await openLootTokenBase.BRIDGE()).to.equal(bridge.address);
    expect(await openLootTokenBase.REMOTE_TOKEN()).to.equal(remoteTokenAddress);
  });

  it("Should allow the bridge to mint tokens", async function () {
    const mintAmount = ethers.utils.parseUnits("1000", 18);
    await openLootTokenBase.connect(bridge).mint(addr1.address, mintAmount);
    expect(await openLootTokenBase.balanceOf(addr1.address)).to.equal(mintAmount);
  });

  it("Should emit a Mint event when tokens are minted", async function () {
    const mintAmount = ethers.utils.parseUnits("1000", 18);
    await expect(openLootTokenBase.connect(bridge).mint(addr1.address, mintAmount))
      .to.emit(openLootTokenBase, "Mint")
      .withArgs(addr1.address, mintAmount);
  });

  it("Should revert minting if called by a non-bridge address", async function () {
    const mintAmount = ethers.utils.parseUnits("1000", 18);
    await expect(openLootTokenBase.connect(addr1).mint(addr1.address, mintAmount))
      .to.be.revertedWith("OpenLootTokenBase: only bridge can mint and burn");
  });

  it("Should revert burning of tokens", async function () {
    await expect(openLootTokenBase.connect(bridge).burn(addr1.address, ethers.utils.parseUnits("1000", 18)))
      .to.be.revertedWith("OpenLootTokenBase cannot be withdrawn");
  });
});