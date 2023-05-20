import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-etherscan";
import { SOLIDITY_OPTIMIZER, WALLET_MNEMONIC } from "./constants";

const config: HardhatUserConfig = {
  paths: {
    sources: "./src",
  },
  solidity: {
    version: "0.8.18",
    settings: {
      optimizer: {
        enabled: SOLIDITY_OPTIMIZER,
        runs: 1000,
      },
    },
  },
  networks: {
    hardhat: {},
  },
};

export default config;
