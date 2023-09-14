import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

type User = {
  _id: string;
  login: string;
  password: string;
};

type StateUsers = {
  users: User[];
  oneUser: User[]
};

const initialState: StateUsers = {
  users: [],
  oneUser: []
}; 



export const oneUser = createAsyncThunk<
  User[],
  void,
  { rejectValue: unknown; state: RootState }
>("users/one", async (_, thunkAPI) => {
  try {
    const res = await fetch("http://localhost:3000/oneUser",{
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${thunkAPI.getState().signInSlice.token}`,
      },
    });
    const users = await res.json();
    return users;
  } catch (e) {
    return thunkAPI.rejectWithValue(e);
  }
});



export const fetchUsers = createAsyncThunk<
  User[],
  void,
  { rejectValue: unknown; state: RootState }
>("users/fetch", async (_, thunkAPI) => {
  try {
    const res = await fetch("http://localhost:3000/users");
    const users = await res.json();
    return users;
  } catch (e) {
    return thunkAPI.rejectWithValue(e);
  }
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    })
    .addCase(oneUser.fulfilled, (state,action) => {
      state.oneUser = action.payload
    })
  },
});

export default usersSlice.reducer;
