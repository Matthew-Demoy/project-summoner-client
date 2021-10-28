import { BigNumber } from "ethers";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getMatchmakerContract } from "../../utils/ethers-utils/matchmaker-utils";
import { getAllCooldowns, setMatchStartTime } from "../battle/battleSlice";
import { saveGameId } from "./menuSlice";

const GameAlert = () => {
  const { address, gameId } = useAppSelector((state) => {
    return state.menu;
  });

  const { matchStart, teamOne, teamTwo } = useAppSelector((state) => {
    return state.battle;
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    const matchmakerContract = getMatchmakerContract();

    const createGameFilter = matchmakerContract.filters.createGameEvent(
      address,
      null
    );
    const startGameFilter = matchmakerContract.filters.startGameEvent(
      null,
      gameId
    );

    matchmakerContract.once(createGameFilter, (summonerId, id, event) => {
      dispatch(saveGameId(id));
    });

    matchmakerContract.once(startGameFilter , (sender, gameId, startTime, event) => {
      // sender, gameId, timeStamp
      dispatch(setMatchStartTime((startTime as BigNumber).toNumber()));
      dispatch(getAllCooldowns({teamOne: teamOne, teamTwo : teamTwo}))
    });
  }, []);

  if (!matchStart) {
    return <span className="game-alert">Waiting for {gameId} to start</span>;
  } else {
    return (
      <div>
        {" "}
        <span className="game-alert"> {gameId} has begun </span> <br></br>
        <a href="/battle">Join the fight</a>
      </div>
    );
  }
};

export default GameAlert;
