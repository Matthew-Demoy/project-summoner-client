import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ethers } from "ethers";
import { fetchCreateGame, fetchStartGame } from "./menuAPI";
declare let window: any;

interface lobby {
  teamOne: string[];
  teamTwo: string[];
}
export interface MenuState {
  address: string | undefined;
  gameId: number | undefined;
}

const initialState: MenuState = {
  address: undefined,
  gameId: undefined,
};

export const getWeb3 = createAsyncThunk("menu/getWeb3", async () => {
  await window.ethereum.enable();
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const signer = provider.getSigner();

  return await signer.getAddress();
});

export const createGame = createAsyncThunk(
  "menu/createGame",
  async (action: { teamOne: string[]; teamTwo: string[] }) => {
    return await fetchCreateGame(action);
  }
);

export const startGame = createAsyncThunk(
    "menu/startGame",
    async (action: { teamOne: string[]; teamTwo: string[], gameId: string }) => {
      return await fetchStartGame(action);
    }
  );

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    saveGameId: (state, action: PayloadAction<number>) => {
      state.gameId = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getWeb3.fulfilled, (state, action) => {
      return {
        ...state,
        address: action.payload,
      };
    });
  },
});

export const {saveGameId} =  menuSlice.actions;

export default menuSlice.reducer;
