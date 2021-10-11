import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IResponse } from '../../utils/Response';
import { RootState } from '../../app/store';

interface UserState {
    username: string,
    status: 'not logged' | 'login' | 'logged' | 'login failed',
    message: string
}

export interface LoginData {
    username: string,
    password: string
}

interface ILoginResponse extends IResponse {
    username: string
}

const initialState:UserState = {
    username: "Please log in",
    status: 'not logged',
    message: ''
};

export const loginUser = createAsyncThunk(
    'user/login',
    async (data:LoginData, thunkAPI) => {
        let response:Response = await fetch(
            `login`,
            {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: data.username,
                    password: data.password
                })
            }
        );
        let jsonResponse = await response.json();
        if (response.status === 200) {
            return jsonResponse;
        } else {
            return thunkAPI.rejectWithValue(jsonResponse);
        }
    }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state:UserState) => {
        state.status = 'login';
        state.message = 'Loggin in';
      })
      .addCase(loginUser.rejected, (state:UserState) => {
        state.status = 'login failed';
        state.message = "Couldn't log you in with those credentials.";
      })
      .addCase(loginUser.fulfilled, (state:UserState, action:PayloadAction<ILoginResponse>) => {
            state.status = 'logged';
            state.message = action.payload.message;
            state.username = action.payload.username;
      });
  },
});

export const selectUsername = (state: RootState) => state.user.username;
export const selectMessage = (state: RootState) => state.user.message;
export const selectStatus = (state: RootState) => state.user.status;

export const {} = userSlice.actions;

export default userSlice.reducer;
