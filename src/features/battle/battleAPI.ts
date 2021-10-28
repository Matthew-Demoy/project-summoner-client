import { BigNumber } from "ethers";
import { getMatchmakerContract } from "../../utils/ethers-utils/matchmaker-utils"

export const getMatchDetails = async (gameId: string) => {
    const league = getMatchmakerContract();

    return league.matches(gameId);
}

export const getSummonerCooldown = async (summonerId: number) : Promise<number> => {
    const league = getMatchmakerContract();
    return (await league.cooldowns(summonerId)).toNumber();
}

export const getSummonerPosition = async (summonerId: number) : Promise<number> => {
    const league = getMatchmakerContract();

    return league.summonerPositions(summonerId).toNumber();
} 