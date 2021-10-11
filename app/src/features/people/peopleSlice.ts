import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IResponse } from '../../utils/Response';
import { RootState } from '../../app/store';
import { People } from '../../app/models';

type PeopleState = {
    entities: Array<People>,
    status: 'idle' | 'updating'
}
const initialState:PeopleState = {
    entities: [],
    status: 'idle'
}

export const getPeopleDataById = createAsyncThunk<
    People,
    {id:number},
    {state: RootState}>
    (
    'people/get',
    async ({id}, thunkAPI) => {
        try {
                const foundPeople = thunkAPI.getState().people.entities.find(f => f.id === id);
                if(foundPeople) {
                    return foundPeople;
                } else {
                    const response:Response = await fetch(
                        `/people/${id}`,
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

export const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
        .addCase(getPeopleDataById.pending, (state:PeopleState) => {
            state.status = 'updating';
        })
        .addCase(getPeopleDataById.rejected, (state:PeopleState) => {
            state.status = 'idle';
        })
        .addCase(getPeopleDataById.fulfilled, (state:PeopleState, action:PayloadAction<People>) => {
            if(state.entities.find(f => f.id === action.payload.id) === undefined)
                state.entities.push(action.payload);
            state.status = 'idle';
        });
  },
});

export const selectPeopleById = (state: RootState, id:number) => state.people.entities.find(f => f.id === id);
export const selectAllPeoples = (state: RootState) => state.people.entities;
export const selectPeopleWithIds = (state: RootState, ids:Array<number>) => state.people.entities.filter(people => ids.find(id => people.id === id) !== undefined);
export default peopleSlice.reducer;
