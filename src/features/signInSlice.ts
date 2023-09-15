import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

type User = {
  _id: string;
  login: string;
  password: string;
};

  
  type stateApp = {
    user: User;
    error: null | string | unknown;
    signIn: boolean;
    token: string | null;
  };
  
  const initialState: stateApp = {
    user: {
    _id: "",
    login: "",
    password: "",
  },
    error: null,
    signIn: false,
    token: localStorage.getItem("token"),
  };


export const authSignIn = createAsyncThunk<
  string,
  { login: string; password: string },
  { rejectValue: unknown; state: RootState }
>("auth/signin", async ({ login, password }, thunkAPI) => {
  try {
    const res = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ login, password }),
    });
    const token = await res.json();
    if (token.error) {
      return thunkAPI.rejectWithValue(token.error);
    }
    localStorage.setItem("token", token.token);
    return token.token;
  } catch (e) {
    return thunkAPI.rejectWithValue(e);
  }
});

const singInSlice = createSlice({
  name: "application",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authSignIn.pending, (state) => {
        (state.signIn = true), (state.error = null);
      })
      .addCase(authSignIn.rejected, (state, action) => {
        (state.error = action.payload), (state.signIn = false);
      })
      .addCase(authSignIn.fulfilled, (state, action) => {
        (state.signIn = false),
        (state.error = null),
        (state.token = action.payload);
        state.user.login = action.meta.arg.login;
        state.user._id = action.payload;
      });
  },
});

export default singInSlice.reducer;
