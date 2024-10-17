require('@nomiclabs/hardhat-ethers');
require("@nomiclabs/hardhat-etherscan");
require('@nomiclabs/hardhat-waffle');
require('dotenv').config();

module.exports = {
  solidity: {
    compilers: [
      {
        version: '0.8.4',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: '0.8.20',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.SEPOLIA_API_KEY}`,
      accounts: [process.env.METAMASK_SECRET_KEY],
      gasPrice: 100000000000
    },
    mainnet: {
      url: `https://eth-mainnet.g.alchemy.com/v2/${process.env.MAINNET_API_KEY}`,
      accounts: [process.env.METAMASK_SECRET_KEY],
      gasPrice: 100000000000
    },
    baseSepolia: {
      url: `https://base-sepolia.g.alchemy.com/v2/${process.env.BASE_SEPOLIA_API_KEY}`,
      accounts: [process.env.METAMASK_SECRET_KEY],
      gasPrice: 100000000000
    },
    baseMainnet: {
      url: `https://base-mainnet.g.alchemy.com/v2/${process.env.BASE_MAINNET_API_KEY}`,
      accounts: [process.env.METAMASK_SECRET_KEY],
      gasPrice: 100000000000
    },
  },
  etherscan: {
    apiKey: {
      mainnet: process.env.ETHERSCAN_API_KEY, // API key for Etherscan (Mainnet)
      sepolia: process.env.ETHERSCAN_API_KEY, // API key for Etherscan (Sepolia)
      base: process.env.BASESCAN_API_KEY, // API key for Basescan (Base Mainnet)
      'base-sepolia': process.env.BASESCAN_API_KEY, // API key for Basescan (Base Sepolia)
    },
    customChains: [
      {
        network: "base",
        chainId: 8453,
        urls: {
          apiURL: "https://api.basescan.org/api",
          browserURL: "https://basescan.org"
        }
      },
      {
        network: "base-sepolia",
        chainId: 84532,
        urls: {
          apiURL: "https://api-sepolia.basescan.org/api",
          browserURL: "https://sepolia.basescan.org"
        }
      }
    ]
  },
};