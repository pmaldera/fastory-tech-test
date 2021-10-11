import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import filmSlice from '../features/films/filmSlice';
import peopleSlice from '../features/people/peopleSlice';
import planetsSlice from '../features/planets/planetSlice';
import searchSlice from '../features/search/searchSlice';
import speciesSlice from '../features/species/speciesSlice';
import starshipsSlice from '../features/starships/starshipSlice';
import userReducer from "../features/user/userSlice";
import vehiclesSlice from '../features/vehicles/vehiclesSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    search: searchSlice,
    films: filmSlice,
    people: peopleSlice,
    planets: planetsSlice,
    starships: starshipsSlice,
    species: speciesSlice,
    vehicles: vehiclesSlice
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
