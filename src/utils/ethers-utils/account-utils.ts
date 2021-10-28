import { ethers } from "ethers";
export const getWalletAddress = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const signer = provider.getSigner();

return await signer.getAddress()
};
