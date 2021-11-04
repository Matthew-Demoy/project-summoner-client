import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  isAnyOf,
} from "@reduxjs/toolkit";
import mockSummoners from "../../fixtures/mock-summoners";
import { TileType } from "../../utils/tileType";
import { createGame } from "../menu/menuSlice";
import {
  getRaritySummonerInfo,
  getSummonerCooldown,
  getSummonerPosition,
} from "./battleAPI";
import { map } from "./map/map";

export interface battleState {
  matchStart: number | undefined;
  summoners: summonerInfo[];
  selectedSummoner: number;
  potentialActions: PotentialActions;
}

const initialState: battleState = {
  matchStart: undefined,
  summoners: mockSummoners,
  selectedSummoner: 0,
  potentialActions: {
    preMoves: [],
  },
};

export const getCooldown = createAsyncThunk(
  "battle/getCooldown",
  async (action: number) => {
    return await getSummonerCooldown(action);
  }
);

export const getAllCooldowns = createAsyncThunk(
  "battle/getAllCooldowns",
  async (summoners: summonerInfo[]) => {
    const cooldownPromise = summoners
      .map((t) => t.id)
      .map((id) => getSummonerCooldown(id));

    const cooldowns = (await Promise.all(cooldownPromise)).map(
      (cooldown, index) => ({ cooldown })
    );

    return cooldowns;
  }
);

export const getAllPositions = createAsyncThunk(
  "battle/getAllPositions",
  async (summoners: summonerInfo[]) => {
    const positionPromise = summoners
      .map((t) => t.id)
      .map((id) => getSummonerPosition(id));

    const summonerCooldowns = (await Promise.all(positionPromise)).map(
      (position, index) => ({ position })
    );

    return summonerCooldowns;
  }
);

export const getAllSummonerInfo = createAsyncThunk(
  "battle/getAllSummonerInfo",
  async (summoners: summonerInfo[]) => {
    const infoPromise = summoners
      .map((t) => t.id)
      .map((id) => getRaritySummonerInfo(id));
    const summonerInfo = (await Promise.all(infoPromise)).map(
      (info, index) => ({
        ...info,
      })
    );

    return summonerInfo;
  }
);

const calculatePath = (
  board: TileType[][],
  summonerPositions: position[],
  startingPosition: position,
  desiredPosition: position
) => {
  let paths: position[][] = [[startingPosition]];
  let visitedTiles: position[] = [startingPosition];
  let moveCount = 0;
  while (
    !paths.find(
      (pos) =>
        pos[pos.length - 1].x === desiredPosition.x &&
        pos[pos.length - 1].y === desiredPosition.y
    )
  ) {
    let newPaths: position[][] = [];
    while (paths.length > 0) {
      const currentPath = paths.pop();
      if (currentPath === undefined) {
        console.log("no path");
        break;
      }
      const lastPosition = currentPath[currentPath.length - 1];

      if (
        lastPosition.x + 1 < board[0].length &&
        !summonerPositions.find(
          (s) => s.x === lastPosition.x + 1 && s.y === lastPosition.y
        ) &&
        !visitedTiles.find(
          (e) => e.x === lastPosition.x + 1 && e.y === lastPosition.y
        )
      ) {
        newPaths.push([
          ...currentPath,
          { x: lastPosition.x + 1, y: lastPosition.y },
        ]);

        visitedTiles.push({ x: lastPosition.x + 1, y: lastPosition.y });
      }

      if (
        lastPosition.x - 1 < board[0].length &&
        !summonerPositions.find(
          (s) => s.x === lastPosition.x - 1 && s.y === lastPosition.y
        ) &&
        !visitedTiles.find(
          (e) => e.x === lastPosition.x - 1 && e.y === lastPosition.y
        )
      ) {
        newPaths.push([
          ...currentPath,
          { x: lastPosition.x - 1, y: lastPosition.y },
        ]);
        visitedTiles.push({ x: lastPosition.x - 1, y: lastPosition.y });
      }

      if (
        lastPosition.y + 1 < board.length &&
        !summonerPositions.find(
          (s) => s.x === lastPosition.x && s.y === lastPosition.y + 1
        ) &&
        !visitedTiles.find(
          (e) => e.x === lastPosition.x && e.y === lastPosition.y + 1
        )
      ) {
        newPaths.push([
          ...currentPath,
          { x: lastPosition.x, y: lastPosition.y + 1 },
        ]);
        visitedTiles.push({ x: lastPosition.x, y: lastPosition.y + 1 });
      }

      if (
        lastPosition.y - 1 < board.length &&
        !summonerPositions.find(
          (s) => s.x === lastPosition.x && s.y === lastPosition.y - 1
        ) &&
        !visitedTiles.find(
          (e) => e.x === lastPosition.x && e.y === lastPosition.y - 1
        )
      ) {
        newPaths.push([
          ...currentPath,
          { x: lastPosition.x, y: lastPosition.y - 1 },
        ]);
        visitedTiles.push({ x: lastPosition.x, y: lastPosition.y - 1 });
      }
    }
    paths = newPaths;
    if (moveCount === 50) {
      return undefined;
    }
    moveCount++;
  }

  console.log(moveCount);
  return paths
    .find(
      (pos) =>
        pos[pos.length - 1].x === desiredPosition.x &&
        pos[pos.length - 1].y === desiredPosition.y
    )
    ?.slice(1);
};

export const battleSlice = createSlice({
  name: "battle",
  initialState,
  reducers: {
    setMatchStartTime: (state, action: PayloadAction<number>) => {
      state.matchStart = action.payload;
    },
    selectSummoner: (state, action: PayloadAction<number>) => {
      state.summoners = state.summoners.map((s) => ({
        ...s,
        selected: action.payload === s.id,
      }));
    },
    moveSummoner: (state, action: PayloadAction<position>) => {
      const { summoners } = state;
      const activeSummonerPos = summoners.find((s) => s.selected)?.position;

      if (!activeSummonerPos) {
        return state;
      }
      const path = calculatePath(
        map,
        summoners.map((s) => s.position),
        activeSummonerPos,
        action.payload
      );

      if (!path) {
        return state;
      }

      return {
        ...state,
        potentialActions: {
          preMoves: path,
        },
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createGame.pending, (state, action) => {
      const summoners = action.meta.arg.map((s, i) => {
        return {
          ...state.summoners[i],
          id: parseInt(s),
          cooldown: Date.now(),
        };
      });

      return { ...state, summoners };
    });

    builder.addCase(getCooldown.fulfilled, (state, action) => {
      const { meta, payload } = action;
      const summoners = state.summoners.map((s) => {
        if (s.id === meta.arg) {
          s.cooldown = payload;
        }
        return s;
      });

      return { ...state, summoners };
    });
    builder.addMatcher(
      isAnyOf(
        getAllCooldowns.fulfilled,
        getAllSummonerInfo.fulfilled,
        getAllPositions.fulfilled
      ),
      (state, action) => {
        const { payload: edits } = action;

        const { summoners } = state;

        return {
          ...state,
          summoners: (edits as summonerInfo[]).map((s, i) => ({
            ...summoners[i],
            ...s,
          })),
        };
      }
    );
  },
});

export const { setMatchStartTime, selectSummoner, moveSummoner } =
  battleSlice.actions;

export default battleSlice.reducer;
