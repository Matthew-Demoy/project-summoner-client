/// <reference types="react-scripts" />

type position = {
  x: number,
  y: number
}
type summonerInfo = {
  cooldown: number;
  id: number;
  position: position;
  xp?: number;
  log?: number;
  class?: number;
  level?: number,
  selected: boolean
  team: number;
};

interface PotentialActions {
  preMoves: position[]
}

enum Team {
  ONE,
  TWO
}
interface teamedSummoner extends summonerInfo {
  team: Team;
}
