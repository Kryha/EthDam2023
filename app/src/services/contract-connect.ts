import { ethers } from "ethers";

export const signMessage = async () => {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  try {
    signer.signMessage("Hello World").then((result) => {
      console.log(result);
    });
  } catch (error) {
    // handle error
    console.log(error);
  }
};
