import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IResponse } from '../../utils/Response';
import { RootState } from '../../app/store';
import { Vehicle } from '../../app/models';

type VehiclesState = {
    entities: Array<Vehicle>,
    status: 'idle' | 'updating'
}

const initialState:VehiclesState = {
    entities: [],
    status: 'idle'
}

export const getVehicleDataById = createAsyncThunk<
    Vehicle,
    {id:number},
    {state: RootState}>
    (
    'vehicles/get',
    async ({id}, thunkAPI) => {
        try {
            const foundVehicle = thunkAPI.getState().vehicles.entities.find(f => f.id === id);
            if(foundVehicle) {
                return foundVehicle;
            } else {
                const response:Response = await fetch(
                    `/vehicles/${id}`,
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

export const vehiclesSlice = createSlice({
  name: 'vehicles',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
        .addCase(getVehicleDataById.pending, (state:VehiclesState) => {
            state.status = 'updating';
        })
        .addCase(getVehicleDataById.rejected, (state:VehiclesState) => {
            state.status = 'idle';
        })
        .addCase(getVehicleDataById.fulfilled, (state:VehiclesState, action:PayloadAction<Vehicle>) => {

            if(state.entities.find(f => f.id === action.payload.id) === undefined)
                state.entities.push(action.payload);
        });
  },
});

export const selectVehicleById = (state: RootState, id:number) => state.vehicles.entities.find(f => f.id === id);
export const selectAllVehicles = (state: RootState) => state.vehicles.entities;
export const selectVehiclesWithIds = (state: RootState, ids:Array<number>) => state.vehicles.entities.filter(vehicle => ids.find(id => vehicle.id === id) !== undefined);
export default vehiclesSlice.reducer;
