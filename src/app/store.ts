import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import menuReducer from '../features/menu/menuSlice';
import battleReducer from '../features/battle/battleSlice'
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    menu: menuReducer,
    battle: battleReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
