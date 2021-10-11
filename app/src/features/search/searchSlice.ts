import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IResponse } from '../../utils/Response';
import { RootState } from '../../app/store';
import { Film, People, Planet, Specie, Starship, Vehicle } from '../../app/models';

interface SearchState {
    data: ISearchResponse,
    status: 'not searching' | 'searching' | 'search failed' | 'search successful',
}

export interface SearchData {
    query?: string,
    filter?: string,
    page?:string,
}

export interface ISearchResponse {
    people?: {
        count: number,
        next?: string,
        previous?: string,
        results: Array<People>
    },
    films?: {
        count: number,
        next?: string,
        previous?: string,
        results: Array<Film>
    },
    starships?: {
        count: number,
        next?: string,
        previous?: string,
        results: Array<Starship>
    },
    vehicles?: {
        count: number,
        next?: string,
        previous?: string,
        results: Array<Vehicle>
    },
    species?: {
        count: number,
        next?: string,
        previous?: string,
        results: Array<Specie>
    },
    planets?: {
        count: number,
        next?: string,
        previous?: string,
        results: Array<Planet>
    },
}

const initialState:SearchState = {
    data: {},
    status: 'not searching'
};

export const search = createAsyncThunk(
    'search/search',
    async (data:SearchData, thunkAPI) => {
        try {
            // Had trouble using URLParameters API here so this might be a bit dirty.

            let url = `search?query=${data.query}`;

            if(data.filter && data.filter !== 'all')
                url += `&filter=${data.filter}`;
            if(data.page)
                url += `&page=${data.page}`;

            const response:Response = await fetch(
                url,
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
                return jsonResponse;
            } else {
                const jsonResponse:IResponse = await response.json();
                return thunkAPI.rejectWithValue(jsonResponse);
            }
        } catch(e) {
            console.error(e);
        }
    }
);

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(search.pending, (state:SearchState) => {
        state.status = 'searching';
      })
      .addCase(search.rejected, (state:SearchState) => {
        state.status = 'search failed';
      })
      .addCase(search.fulfilled, (state:SearchState, action:PayloadAction<ISearchResponse>) => {
        state.status = 'search successful';
        state.data = action.payload;
  });
  },
});

export const selectSearchData = (state: RootState) => state.search.data;
export const selectSearchStatus = (state: RootState) => state.search.status;

export const {} = searchSlice.actions;

export default searchSlice.reducer;
