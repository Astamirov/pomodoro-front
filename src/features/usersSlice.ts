import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

type User = {
  _id: string;
  login: string;
  password: string;
  result: number;
};

type StateUsers = {
  users: User[];
  oneUser: User[];
};

const initialState: StateUsers = {
  users: [],
  oneUser: [],
}; 


//один юзер
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

//изменение result
export const patchResult = createAsyncThunk<
User[],
{ rejectValue: unknown; state: RootState }
>(
  'user/patchResult',
  async (_, thunkAPI) => {
    try {
      // Выполните PATCH-запрос на сервер с использованием fetch
      const res = await fetch("http://localhost:3000/userResult", {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${thunkAPI.getState().signInSlice.token}`,

        },
      });

      const data = await res.json();
      return data;
    } catch (error) {
      // Если произошла ошибка, отклоните thunk с сообщением об ошибке
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//отображение всех юзеров
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
    .addCase(patchResult.fulfilled, (state, action) => {
      // Обработка успешного завершения thunk
      state.oneUser = action.payload;
    })
  },
});

export default usersSlice.reducer;
