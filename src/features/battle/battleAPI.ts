import {
  getMatchmakerContract,
  getRarityContract,
} from "../../utils/ethers-utils/matchmaker-utils";

export const getMatchDetails = async (gameId: string) => {
  const league = getMatchmakerContract();

  return league.matches(gameId);
};

export const getSummonerCooldown = async (
  summonerId: number
): Promise<number> => {
  const league = getMatchmakerContract();
  return (await league.cooldowns(summonerId)).toNumber();
};

export const getSummonerPosition = async (
  summonerId: number
): Promise<{ x: number; y: number }> => {
  const league = getMatchmakerContract();
  const res = await league.getSummonerPosition(summonerId);
  return { x: res.x.toNumber(), y: res.y.toNumber() };
};

export const getRaritySummonerInfo = async (summonerId: number) => {
  const rarity = getRarityContract();

  const res = await rarity.summoner(summonerId);

  return {
    class: res._class.toNumber(),
    level: res._level.toNumber(),
    log: res._log.toNumber(),
    xp: res.xp.toNumber(),
  };
};
