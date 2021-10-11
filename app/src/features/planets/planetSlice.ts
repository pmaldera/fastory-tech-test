import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IResponse } from '../../utils/Response';
import { RootState } from '../../app/store';
import { Planet } from '../../app/models';

type PlanetsState = {
    entities: Array<Planet>,
    status: 'idle' | 'updating'
}
const initialState:PlanetsState = {
    entities: [],
    status: 'idle'
}
export const getPlanetDataById = createAsyncThunk<
    Planet,
    {id:number},
    {state: RootState}>
    (
    'planets/get',
    async ({id}, thunkAPI) => {
        try {
            const foundPlanet = thunkAPI.getState().planets.entities.find(f => f.id === id);
            if(foundPlanet) {
                return foundPlanet;
            } else {
                const response:Response = await fetch(
                    `/planets/${id}`,
                    {
                        method: 'GET',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                );
                
                if (response.status === 200) {
                    const jsonResponse = await response.json();
                    jsonResponse.id = id;
                    return jsonResponse;
                } else {
                    const jsonResponse:IResponse = await response.json();
                    return thunkAPI.rejectWithValue(jsonResponse);
                }
            }

        } catch(e) {
            console.error(e);
        }
    }
);

export const planetsSlice = createSlice({
  name: 'planets',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
        .addCase(getPlanetDataById.pending, (state:PlanetsState) => {
            state.status = 'updating';
        })
        .addCase(getPlanetDataById.rejected, (state:PlanetsState) => {
            state.status = 'idle';
        })
        .addCase(getPlanetDataById.fulfilled, (state:PlanetsState, action:PayloadAction<Planet>) => {
            if(state.entities.find(f => f.id === action.payload.id) === undefined)
                state.entities.push(action.payload);
        });
  },
});

export const selectPlanetById = (state: RootState, id:number) => state.planets.entities.find(f => f.id === id);
export const selectAllPlanets = (state: RootState) => state.planets.entities;
export const selectPlanetsWithIds = (state: RootState, ids:Array<number>) => state.planets.entities.filter(planet => ids.find(id => planet.id === id) !== undefined);
export default planetsSlice.reducer;
