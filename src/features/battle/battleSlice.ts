import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useAppDispatch } from "../../app/hooks";
import mockSummoners from "../../fixtures/mock-summoners";
import { createGame } from "../menu/menuSlice";
import { getSummonerCooldown } from "./battleAPI";
type summonerInfo = {
  cooldown: number;
  id: number;
};
export interface battleState {
  matchStart: number | undefined;
  teamOne: summonerInfo[];
  teamTwo: summonerInfo[];
}

const initialState: battleState = {
  matchStart: undefined,
  teamOne: mockSummoners.slice(0, 4),
  teamTwo: mockSummoners.slice(4, 8),
};

export const getCooldown = createAsyncThunk(
  "battle/getCooldown",
  async (action: number) => {
    console.log(action);
    return await getSummonerCooldown(action);
  }
);

export const getAllCooldowns = createAsyncThunk(
  "battle/getAllCooldowns",
  async (action: { teamOne: summonerInfo[]; teamTwo: summonerInfo[] }) => {
    const { teamOne, teamTwo } = action;

    const t1Promise = teamOne
      .map((t) => t.id)
      .map((id) => getSummonerCooldown(id));

    const t1Cooldowns = (await Promise.all(t1Promise)).map(
      (cooldown, index) => ({ ...teamOne[index], cooldown })
    );

    const t2Promise = teamTwo
      .map((t) => t.id)
      .map((id) => getSummonerCooldown(id));

    const t2Cooldowns = (await Promise.all(t2Promise)).map(
      (cooldown, index) => ({ ...teamTwo[index], cooldown })
    );
      console.log(t1Cooldowns)
      console.log(t2Cooldowns)
    return {
      teamOne: t1Cooldowns,
      teamTwo: t2Cooldowns,
    };
  }
);

export const battleSlice = createSlice({
  name: "battle",
  initialState,
  reducers: {
    setMatchStartTime: (state, action: PayloadAction<number>) => {
      state.matchStart = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createGame.pending, (state, action) => {
      console.log(action.meta.arg.teamOne);
      console.log(action.meta.arg.teamTwo);
      const teamOne = action.meta.arg.teamOne.map((s) => {
        return {
          id: parseInt(s),
          cooldown: Date.now(),
        };
      });

      const teamTwo = action.meta.arg.teamTwo.map((s) => {
        return {
          id: parseInt(s),
          cooldown: Date.now(),
        };
      });

      return { ...state, teamOne, teamTwo };
    });

    builder.addCase(getCooldown.fulfilled, (state, action) => {
      const { meta, payload } = action;
      console.log("cooldown fufillled " + payload);
      const teamOne = state.teamOne.map((s) => {
        if (s.id === meta.arg) {
          s.cooldown = payload;
        }
        return s;
      });

      const teamTwo = state.teamTwo.map((s) => {
        if (s.id === meta.arg) {
          s.cooldown = payload;
        }
        return s;
      });

      return { ...state, teamOne, teamTwo };
    });

    builder.addCase(getAllCooldowns.fulfilled, (state, action) => {
      const {
        payload: { teamOne, teamTwo },
      } = action;
      return {
        ...state,
        teamOne,
        teamTwo,
      };
    });
  },
});

export const { setMatchStartTime } = battleSlice.actions;

export default battleSlice.reducer;
