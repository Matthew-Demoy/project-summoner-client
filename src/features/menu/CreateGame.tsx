import React from "react";
import { useAppDispatch } from "../../app/hooks";
import { defaultTeamOne, defaultTeamTwo } from "../../utils/addresses";
import { createGame } from "./menuSlice";

const CreateGame = () => {
  const dispatch = useAppDispatch();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const teamSize = [1, 2, 3, 4];
    const teamOne = teamSize.map((index) => {
      return (
        target[`team-1-summoner-${index}`].value || defaultTeamOne[index - 1]
      );
    });

    const teamTwo = teamSize.map((index) => {
      return (
        target[`team-2-summoner-${index}`].value || defaultTeamTwo[index - 1]
      );
    });
    dispatch(createGame([...teamOne, ...teamTwo]));
  };
  return (
    <form onSubmit={handleSubmit}>
      <h3>Team One</h3>
      <label>Summoner One</label>

      <input type="text" id="team-1-summoner-1" name="team-1-summoner-1" />
      <br />
      <label>Summoner Two</label>

      <input type="text" id="team-1-summoner-2" name="team-1-summoner-2" />
      <br />

      <label>Summoner Three</label>

      <input type="text" id="team-1-summoner-3" name="team-1-summoner-3" />
      <br />

      <label>Summoner Four</label>

      <input type="text" id="team-1-summoner-4" name="team-1-summoner-4" />
      <br />

      <h3>Team Two</h3>
      <label>Summoner One</label>

      <input type="text" id="team-2-summoner-1" name="team-2-summoner-1" />
      <br />
      <label>Summoner Two</label>

      <input type="text" id="team-2-summoner-2" name="team-2-summoner-2" />
      <br />

      <label>Summoner Three</label>

      <input type="text" id="team-2-summoner-3" name="team-2-summoner-3" />
      <br />

      <label>Summoner Four</label>

      <input type="text" id="team-2-summoner-4" name="team-2-summoner-4" />
      <br />
      <input type="submit" id="submit" name="submit" />
    </form>
  );
};

export default CreateGame;
