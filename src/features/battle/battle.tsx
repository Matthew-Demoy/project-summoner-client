import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  getAllCooldowns,
  getAllPositions,
  getAllSummonerInfo,
} from "./battleSlice";
import Cooldowns from "./cooldowns/Cooldowns";
import Board from "./map/Board";

const Battle = () => {
  const dispatch = useAppDispatch();
  const { teamOne, teamTwo } = useAppSelector((s) => s.battle);
  useEffect(() => {
    dispatch(getAllCooldowns({ teamOne, teamTwo }));
    dispatch(getAllSummonerInfo({ teamOne, teamTwo }));
    dispatch(getAllPositions({ teamOne, teamTwo }));
  }, []);

  return (
    <div>
      <Cooldowns />
      <Board />
      {/**
       * Map
       * cooldowns
       * Control options
       */}
    </div>
  );
};

export default Battle;
