async function main() {
  if(!process.env.OWNER_ADDRESS) {
    console.error('OWNER ADDRESS env var missing')
    process.exit(1)
  }

  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const weiAmount = (await deployer.getBalance()).toString();
  
  console.log("Account balance:", (await ethers.utils.formatEther(weiAmount)));

  const Token = await ethers.getContractFactory("OpenLootToken");
  const args = [
    "OPENLOOT",
    "OL",
    5000000000,
    process.env.OWNER_ADDRESS
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