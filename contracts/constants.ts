import { config as dotEnvConfig } from "dotenv";

dotEnvConfig();
const ENV = process.env;
type Environment = "dev" | "stage" | "prod";

export const isEnvironment = (env?: string): env is Environment => {
  return env === "dev" || env === "stage" || env === "prod";
};

export const HARDHAT_ENV = isEnvironment(ENV.HARDHAT_ENV)
  ? ENV.HARDHAT_ENV
  : "dev";

export const SOLIDITY_OPTIMIZER = ENV.HARDHAT_ENV === "dev" ? false : true;
export const WALLET_MNEMONIC = ENV.WALLET_MNEMONIC;
