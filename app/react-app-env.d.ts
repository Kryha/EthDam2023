import { ExeternalProvider } from "ethers";

declare global {
  interface Window {
    ethereum: ExeternalProvider;
  }
}
