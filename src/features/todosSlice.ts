import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
type Category = {
  _id: string;
  category: string;
};
type Todo = {
  _id: string;
  category: string;
  text: string;
  completed: boolean;
  count: number;
};

type TodoState = {
  todos: Todo[];
  category: Category[];
  error: string | null | unknown;
};

const initialState: TodoState = {
  category: [],
  todos: [],
  error: null,
  
};
//слайс на добавление тудушки
export const addTodo = createAsyncThunk<
  Todo,
  { text: string; category: string },
  { rejectValue: string }
>("todos/addtodo", async ({ text, category }, thunkAPI) => {
  try {
    const res = await fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${thunkAPI.getState().signInSlice.token}`,
      },
      body: JSON.stringify({ text, category }),
    });
    const todo = await res.json();
    return thunkAPI.fulfillWithValue(todo);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
// изменение completed
export const updateCompleted = createAsyncThunk<
  Todo,
  { _id: string; completed: boolean },
  { rejectValue: unknown }
>("patch/updateComplet", async ({ _id, completed }, thunkAPI) => {
  try {
    const res = await fetch(`http://localhost:3000/todosPatchCom/${_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: !completed }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

//удаление туду
export const removeTodo = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("todos/removeTodo", async (_id, thunkAPI) => {
  try {
    const res = await fetch(`http://localhost:3000/todosDelete/${_id}`, {
      method: "DELETE",
    });

    const todo = await res.json();
    return todo
  } catch (error) {
    return thunkAPI.rejectWithValue(error.mesaage);
  }
});

//изменение count
export const updateCount = createAsyncThunk<
  Todo,
  { _id: string; count: number },
  { rejectValue: unknown }
>("patch/updateCount", async ({ _id, count }, thunkAPI) => {
  try {
    const res = await fetch(`http://localhost:3000/todosPatchCount/${_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ count }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

//отоброжение тудушек
export const fetchTodo = createAsyncThunk<
  Todo,
  void,
  { rejectValue: string }
>("todos/getTodo", async (_, thunkAPI) => {
  try {
    const res = await fetch("http://localhost:3000/todos", 
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${thunkAPI.getState().signInSlice.token}`,
      },
    });
    const todo = await res.json();
    return thunkAPI.fulfillWithValue(todo);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

//показ категорий
export const fetchCateg = createAsyncThunk<
  Category[],
  void,
  { rejectValue: string }
>("category/getcategory", async (_, thunkAPI) => {
  try {
    const res = await fetch("http://localhost:3000/category");
    const todo = await res.json();
    return thunkAPI.fulfillWithValue(todo);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const todoSlice = createSlice({
  name: "Todo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(removeTodo.fulfilled, (state,action) => {
      state.todos = state.todos.filter((item) => item._id !== action.meta.arg)
    })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todos = action.payload;
        state.error = null;
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(fetchTodo.fulfilled, (state, action) => {
        state.todos = action.payload;
        state.error = null;
      })
      .addCase(fetchTodo.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(fetchCateg.fulfilled, (state, action) => {
        state.category = action.payload;
        state.error = null;
      })
      .addCase(fetchCateg.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateCount.fulfilled, (state, action) => {
        const updatedTodo = state.todos.find(
          (todo) => todo._id === action.payload._id
        );
        if (updatedTodo) {
          updatedTodo.count = action.payload.count;
        }
        state.error = null;
      })
      .addCase(updateCount.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateCompleted.fulfilled, (state, action) => {
        const updateCompleted = state.todos.find(
          (todo) => todo._id === action.payload._id
        );
        if (updateCompleted) {
          updateCompleted.completed = !updateCompleted.completed;
        }
        state.error = null;
      })
      .addCase(updateCompleted.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default todoSlice.reducer;
