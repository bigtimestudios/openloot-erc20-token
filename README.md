
# Open Loot $OPENLOOT ERC-20 Token

This is a project for the ERC-20 token contract of Open Loot (OL).
For more information, please visit: https://wiki.bigtime.gg/big-time-economy/economy-components/resources/usdtime-tokens.

Run the compilitation for the contract:

```shell
npx hardhat compile
```

Run the deployment for the token:

```shell
npx hardhat run scripts/deploy.js
```

Validate token contract
```shell
npx hardhat verify --contract contracts/OpenLootToken.sol:OpenLootToken --network sepolia {TOKEN_CONTRACT} "Open Loot" 'OPENLOOT' 5000000000 {OWNER}
```

Useful commands:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
```