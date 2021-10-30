/// <reference types="react-scripts" />

type summonerInfo = {
  cooldown: number;
  id: number;
  position: {
    x: number;
    y: number;
  };
  xp?: number;
  log?: number;
  class?: number;
  level?: number
};

enum Team {
  ONE,
  TWO
}
interface teamedSummoner extends summonerInfo {
  team: Team;
}
