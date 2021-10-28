import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { getWeb3 } from "./menuSlice";

const Menu = () => {
  const dispatch = useAppDispatch();
  let history = useHistory();

  useEffect(() => {
    dispatch(getWeb3());
  });

  return (
    <div>
      {" "}
      <button onClick={() => history.push("/create-game/")}>
        Create Game
      </button>{" "}
      <button onClick={() => history.push("/start-game/")}>Start Game</button>{" "}
    </div>
  );
};

export default Menu;
