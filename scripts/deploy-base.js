async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const weiAmount = (await deployer.getBalance()).toString();
  
  console.log("Account balance:", (await ethers.utils.formatEther(weiAmount)));

  const Token = await ethers.getContractFactory("OpenLootTokenBase");
  const args = [
    "0x4200000000000000000000000000000000000010", // L2 standard bridge
    "0x51fe233C9c4518A84dc14eF8033d804FAe35a25D", // OpenLootToken (sepolia)
    "Open Loot",
    "OPENLOOT",
  ]
  const token = await Token.deploy(...args);

  console.log("Token address:", token.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});