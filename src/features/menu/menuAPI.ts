import { getMatchmakerContract } from "../../utils/ethers-utils/matchmaker-utils";

interface createGamePayload {
  teamOne: string[];
  teamTwo: string[];
}

interface startGamePayload {
  teamOne: string[];
  teamTwo: string[];
  gameId: string
}
export const fetchCreateGame = async (payload: createGamePayload) => {
  const projectSummoners = getMatchmakerContract();
  projectSummoners.createGame(payload.teamOne, payload.teamTwo, 0);
};

export const fetchStartGame = async (payload: startGamePayload) => {
  const projectSummoners = getMatchmakerContract();
  projectSummoners.startGame(payload.teamOne, payload.teamTwo, payload.gameId);
};

