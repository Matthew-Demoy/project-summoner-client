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
  const {  summoners } = useAppSelector((s) => s.battle);
  useEffect(() => {
    dispatch(getAllCooldowns(summoners));
    dispatch(getAllSummonerInfo(summoners));
    dispatch(getAllPositions(summoners));
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
