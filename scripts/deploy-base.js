async function main() {
  if (!process.env.L2BRIDGE) {
    console.error('l2Bridge param missing (L2 standard bridge)')
    process.exit(1)
  }
  if (!process.env.REMOTETOKEN) {
    console.error('remoteToken param missing (OpenLootToken)')
    process.exit(1)
  }

  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const weiAmount = (await deployer.getBalance()).toString();
  
  console.log("Account balance:", (await ethers.utils.formatEther(weiAmount)));

  const Token = await ethers.getContractFactory("OpenLootTokenBase");
  const args = [
    process.env.L2BRIDGE, // L2 standard bridge
    process.env.REMOTETOKEN, // OpenLootToken Address
    "OPENLOOT",
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