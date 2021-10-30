import { ethers } from "ethers";
import { matchMakerABI } from "../abis/matchmaker";
import { rarity } from "../abis/rarity";
import { projectSummonerAddress, rarityContractAddress } from "../addresses";

export const getMatchmakerContract = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const signer = provider.getSigner();

  return new ethers.Contract(
    projectSummonerAddress,
    JSON.stringify(matchMakerABI),
    signer
  );
};

export const getRarityContract = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  return new ethers.Contract(rarityContractAddress, rarity, provider);
  
};
