import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IResponse } from '../../utils/Response';
import { RootState } from '../../app/store';
import { Film } from '../../app/models';

type FilmsState = {
    entities: Array<Film>,
    status: 'idle' | 'updating'
}

const initialState:FilmsState = {
    entities: [],
    status: 'idle'
}

export const getFilmDataById = createAsyncThunk<
    Film,
    {id:number},
    {state: RootState}>
    (
    'films/get',
    async ({id}, thunkAPI) => {
        try {
            // Kind of a front cache: since the data won't change, don't fetch it if we already have it.
            const foundFilm = thunkAPI.getState().films.entities.find(f => f.id === id);
            if(foundFilm) {
                return foundFilm;
            } else {
                const response:Response = await fetch(
                    `/films/${id}`,
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
                    // Id is set dynamicly to avoid parsing entity url each time.
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

export const filmsSlice = createSlice({
  name: 'films',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
        .addCase(getFilmDataById.pending, (state:FilmsState) => {
            state.status = 'updating';
        })
        .addCase(getFilmDataById.rejected, (state:FilmsState) => {
            state.status = 'idle';
        })
        .addCase(getFilmDataById.fulfilled, (state:FilmsState, action:PayloadAction<Film>) => {
            // Pushed in store only if not already in.
            if(state.entities.find(f => f.id === action.payload.id) === undefined)
                state.entities.push(action.payload);
        });
  },
});

export const selectFilmById = (state: RootState, id:number) => state.films.entities.find(f => f.id === id);
export const selectAllFilms = (state: RootState) => state.films.entities;
export const selectFilmsWithIds = (state: RootState, ids:Array<number>) => state.films.entities.filter(film => ids.find(id => film.id === id) !== undefined);
export default filmsSlice.reducer;
