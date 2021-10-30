import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  isAnyOf,
} from "@reduxjs/toolkit";
import { useAppDispatch } from "../../app/hooks";
import mockSummoners from "../../fixtures/mock-summoners";
import { createGame } from "../menu/menuSlice";
import {
  getRaritySummonerInfo,
  getSummonerCooldown,
  getSummonerPosition,
} from "./battleAPI";

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
    return await getSummonerCooldown(action);
  }
);

export const getAllCooldowns = createAsyncThunk(
  "battle/getAllCooldowns",
  async (action: { teamOne: summonerInfo[]; teamTwo: summonerInfo[] }) => {
    const { teamOne, teamTwo } = action;
    console.log("get all cooldowns")
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
    return {
      teamOne: t1Cooldowns,
      teamTwo: t2Cooldowns,
    };
  }
);

export const getAllPositions = createAsyncThunk(
  "battle/getAllPositions",
  async (action: { teamOne: summonerInfo[]; teamTwo: summonerInfo[] }) => {
    
    const { teamOne, teamTwo } = action;
    const t1Promise = teamOne
      .map((t) => t.id)
      .map((id) => getSummonerPosition(id));

    const t1Cooldowns = (await Promise.all(t1Promise)).map(
      (position, index) => ({ ...teamOne[index], position })
    );

    const t2Promise = teamTwo
      .map((t) => t.id)
      .map((id) => getSummonerPosition(id));

    const t2Cooldowns = (await Promise.all(t2Promise)).map(
      (position, index) => ({ ...teamTwo[index], position })
    );
    return {
      teamOne: t1Cooldowns,
      teamTwo: t2Cooldowns,
    };
  }
);

export const getAllSummonerInfo = createAsyncThunk(
  "battle/getAllSummonerInfo",
  async (action: { teamOne: summonerInfo[]; teamTwo: summonerInfo[] }) => {
    const { teamOne, teamTwo } = action;

    const t1Promise = teamOne
      .map((t) => t.id)
      .map((id) => getRaritySummonerInfo(id));

    const t1Cooldowns = (await Promise.all(t1Promise)).map((info, index) => ({
      ...teamOne[index],
      ...info,
    }));

    const t2Promise = teamTwo
      .map((t) => t.id)
      .map((id) => getRaritySummonerInfo(id));

    const t2Cooldowns = (await Promise.all(t2Promise)).map((info, index) => ({
      ...teamTwo[index],
      ...info,
    }));
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
      const teamOne = action.meta.arg.teamOne.map((s, i) => {
        return {
          ...state.teamOne[i],
          id: parseInt(s),
          cooldown: Date.now(),
        };
      });

      const teamTwo = action.meta.arg.teamTwo.map((s, i) => {
        return {
          ...state.teamTwo[i],
          id: parseInt(s),
          cooldown: Date.now(),
        };
      });

      return { ...state, teamOne, teamTwo };
    });

    builder.addCase(getCooldown.fulfilled, (state, action) => {
      const { meta, payload } = action;
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
    builder.addMatcher(
      isAnyOf(
        getAllCooldowns.fulfilled,
        getAllSummonerInfo.fulfilled,
        getAllPositions.fulfilled
      ),
      (state, action) => {
        const {
          payload: { teamOne, teamTwo },
        } = action;
        return {
          ...state,
          teamOne,
          teamTwo,
        };
      }
    );
  },
});

export const { setMatchStartTime } = battleSlice.actions;

export default battleSlice.reducer;
