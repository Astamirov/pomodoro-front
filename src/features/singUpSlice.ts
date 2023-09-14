import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

type User = {
    _id: string;
    login: string;
    password: string;
  };
  
  type stateApp = {
    user: User[];
    error: null | string | unknown;
    signUp: boolean;
  };
  
  const initialState: stateApp = {
    user: [],
    error: null,
    signUp: false,
  };

export const authSignUp = createAsyncThunk<
  string,
  User,
  { rejectValue: unknown; state: RootState }
>("auth/signup", async ({ login, password }, thunkAPI) => {
  try {
    const res = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ login, password }),
    });
    const json = await res.json();
    if (json.error) {
      return thunkAPI.rejectWithValue(json.error);
    }
    return json;
  } catch (e) {
    return thunkAPI.rejectWithValue(e);
  }
});

const singUpSlice = createSlice({
    name: "application",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(authSignUp.pending, (state) => {
          (state.signUp = true), (state.error = null);
        })
        .addCase(authSignUp.rejected, (state, action) => {
          (state.signUp = false), (state.error = action.payload);
        })
        .addCase(authSignUp.fulfilled, (state) => {
          (state.signUp = false), (state.error = null);
        })
    },
  });
  
  export default singUpSlice.reducer;