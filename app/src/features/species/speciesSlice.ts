import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IResponse } from '../../utils/Response';
import { RootState } from '../../app/store';
import { Specie } from '../../app/models';

type SpeciesState = {
    entities: Array<Specie>,
    status: 'idle' | 'updating'
}

const initialState:SpeciesState = {
    entities: [],
    status: 'idle'
}

export const getSpecieDataById = createAsyncThunk<
    Specie,
    {id:number},
    {state: RootState}>
    (
    'species/get',
    async ({id}, thunkAPI) => {
        try {
            const foundSpecie = thunkAPI.getState().species.entities.find(f => f.id === id);
            if(foundSpecie) {
                return foundSpecie;
            } else {
                const response:Response = await fetch(
                    `/species/${id}`,
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

export const speciesSlice = createSlice({
  name: 'species',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
        .addCase(getSpecieDataById.pending, (state:SpeciesState) => {
            state.status = 'updating';
        })
        .addCase(getSpecieDataById.rejected, (state:SpeciesState) => {
            state.status = 'idle';
        })
        .addCase(getSpecieDataById.fulfilled, (state:SpeciesState, action:PayloadAction<Specie>) => {

            if(state.entities.find(f => f.id === action.payload.id) === undefined)
                state.entities.push(action.payload);
        });
  },
});

export const selectSpecieById = (state: RootState, id:number) => state.species.entities.find(f => f.id === id);
export const selectAllSpecies = (state: RootState) => state.species.entities;
export const selectSpeciesWithIds = (state: RootState, ids:Array<number>) => state.species.entities.filter(specie => ids.find(id => specie.id === id) !== undefined);
export default speciesSlice.reducer;
