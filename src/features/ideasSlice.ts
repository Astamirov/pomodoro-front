import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { v4 as uuidv4 } from 'uuid';

// Замените этот тип на актуальный тип для данных, которые возвращает ваш сервер
export type Comments = {
  _id: string;
  id: string;
  text: string;
  date: string;
  author: string;
  error: string | null | unknown;
  username: string | null;
};

type StateApp = {
  token: string | null;
  error: string | null | unknown;
  comments: Comments[];
  username: string | null;
  userId: string | null;
};

const initialState: StateApp = {
  error: null,
  token: localStorage.getItem("token"),
  comments: JSON.parse(localStorage.getItem("comments") || "[]"),
  username: null,
  userId: null,
};

export const loadComments = createAsyncThunk(
  "ideas/loadComments",
  // Здесь должен быть ваш запрос к серверу для загрузки комментариев
  async (_, thunkAPI) => {
    try {
      const response = await fetch("http://localhost:3000/comments");
      if (!response.ok) {
        throw new Error("Failed to fetch comments");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const postComment = createAsyncThunk<
  Comments,
  {
    commentText: string;
    author: { login: string };
  },
  { rejectValue: unknown; state: RootState }
>("ideas/postComment", async ({ commentText, author }, thunkAPI) => {
  const token = thunkAPI.getState().ideas.token;
  try {
    const response = await fetch(`http://localhost:3000/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ text: commentText, author: author }),
    });

    const data = await response.json();

    return thunkAPI.fulfillWithValue(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const removeComment = createAsyncThunk<
  string,
  { commentId: string },
  { rejectValue: string; state: RootState }
>("comment/removeComment", async ({ commentId }, thunkAPI) => {
  const token = thunkAPI.getState().ideas.token;
  try {
    const res = await fetch(
      `http://localhost:3000/deleteComment/${commentId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(res);
    if (res.ok) {
      console.log("ok");
      return commentId;
    }

    const comment = await res.json();
    return thunkAPI.rejectWithValue(comment);
  } catch (error) {
    console.log("osk");
    return thunkAPI.rejectWithValue((error as Error).message);
  }
});

const ideasSlice = createSlice({
  name: "ideas",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadComments.fulfilled, (state, action) => {
       
        const commentsWithIds = action.payload.map((comment) => ({
            ...comment,
            id: uuidv4(), // Добавляем уникальный идентификатор
          }));
          state.comments = commentsWithIds;
          
      })
      .addCase(loadComments.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(postComment.fulfilled, (state, action) => {
        state.username = action.meta.arg.author.login;
      })
      .addCase(postComment.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(removeComment.fulfilled, (state, action) => {
        const commentId = action.payload;

        state.comments = state.comments.filter(
          (item) => item._id !== commentId
        );

        state.error = null;
      })
      .addCase(
        removeComment.rejected,
        (state, action: PayloadAction<string | unknown>) => {
          state.error = action.payload;
        }
      );
  },
});

export default ideasSlice.reducer;
