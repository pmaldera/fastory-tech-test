import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IResponse } from '../../utils/Response';
import { RootState } from '../../app/store';
import { Starship } from '../../app/models';

type StarshipsState = {
    entities: Array<Starship>,
    status: 'idle' | 'updating'
}

const initialState:StarshipsState = {
    entities: [],
    status: 'idle'
}

export const getStarshipDataById = createAsyncThunk<
    Starship,
    {id:number},
    {state: RootState}>
    (
    'starships/get',
    async ({id}, thunkAPI) => {
        try {
            const foundStarship = thunkAPI.getState().starships.entities.find(f => f.id === id);
            if(foundStarship) {
                return foundStarship;
            } else {
                const response:Response = await fetch(
                    `/starships/${id}`,
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

export const starshipsSlice = createSlice({
  name: 'starships',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
        .addCase(getStarshipDataById.pending, (state:StarshipsState) => {
            state.status = 'updating';
        })
        .addCase(getStarshipDataById.rejected, (state:StarshipsState) => {
            state.status = 'idle';
        })
        .addCase(getStarshipDataById.fulfilled, (state:StarshipsState, action:PayloadAction<Starship>) => {

            if(state.entities.find(f => f.id === action.payload.id) === undefined)
                state.entities.push(action.payload);
        });
  },
});

export const selectStarshipById = (state: RootState, id:number) => state.starships.entities.find(f => f.id === id);
export const selectAllStarships = (state: RootState) => state.starships.entities;
export const selectStarshipsWithIds = (state: RootState, ids:Array<number>) => state.starships.entities.filter(starship => ids.find(id => starship.id === id) !== undefined);
export default starshipsSlice.reducer;
