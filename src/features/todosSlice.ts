import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
type Category = {
    _id: string;
    category: string;
}
type Todo = {
    _id: string;
    category: string;
    text: string;
    completed: boolean;
    count: number;
}

type TodoState = {
    todos: Todo[];
    category: Category[];
    error: string | null | unknown
}

const initialState: TodoState = {
    category:[],
    todos: [],
    error: null
}
//слайс на добавление тудушки
export const addTodo = createAsyncThunk<Todo,
string,
{ rejectValue: string }>("todos/addtodo",async ({text, category}, thunkAPI) => {
 try {
    const res = await fetch("http://localhost:3000/todos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({text, category})
    })
    const todo = await res.json();
    return thunkAPI.fulfillWithValue(todo)
 } catch (error) {
    return thunkAPI.rejectWithValue(error);
 }   
})

//отоброжение тудушек
export const fetchTodo = createAsyncThunk<
  Todo[],void,
  { rejectValue: string }
>("todos/getTodo", async (_, thunkAPI) => {
  try {
    const res = await fetch("http://localhost:3000/todos");
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
        .addCase(addTodo.fulfilled, (state, action)=> {
            state.todos = action.payload
            state.error = null
        })
        .addCase(addTodo.rejected, (state, action) => {
            state.error = action.payload;
          })
          .addCase(fetchTodo.fulfilled, (state, action) => {
            state.todos = action.payload;
            state.error = null;
          })
          .addCase(
            fetchTodo.rejected,
            (state, action) => {
              state.error = action.payload;
            }
          )
          .addCase(fetchCateg.fulfilled, (state, action) => {
            state.category = action.payload;
            state.error = null;
          })
          .addCase(
            fetchCateg.rejected,
            (state, action) => {
              state.error = action.payload;
            }
          )
    }
})

export default todoSlice.reducer;