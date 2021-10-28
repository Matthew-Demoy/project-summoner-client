import { ethers } from "ethers";
import { matchMakerABI } from "../abis/matchmaker";
import { projectSummonerAddress } from "../addresses";

export const getMatchmakerContract = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const signer = provider.getSigner();

  return new ethers.Contract(
    projectSummonerAddress,
    JSON.stringify(matchMakerABI),
    signer
  );
};
