// ideasSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

// Замените этот тип на актуальный тип для данных, которые возвращает ваш сервер
export type Comments = {
  _id: string;
  text: string;
  error: string | null | unknown;
  author: {
    _id: string;
    login: string;
  };
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

export const postComment = createAsyncThunk<
  Comment,
  {
    commentText: string;
    author: { login: string };
  },
  { rejectValue: unknown; state: RootState }
>(
  "ideas/postComment",
  async ({ commentText, author }, thunkAPI) => {
    const token = thunkAPI.getState().ideas.token;

    try {
      const response = await fetch(
        `http://localhost:4000/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "ideas/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ text: commentText, author }),
        }
      );

      const data = await response.json();

      if (data.success) {
        return data.comment;
      } else {
        return thunkAPI.rejectWithValue(data.error);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const removeComment = createAsyncThunk<
  string,
  { commentId: string },
  { rejectValue: string; state: RootState }
>("comment/removeComment", async ({ commentId }, thunkAPI) => {
  const token = thunkAPI.getState().ideas.token;
  try {
    const res = await fetch(
      `http://localhost:4000/deleteComment/${commentId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "ideas/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.ok) {
      return commentId;
    }
    const comment = await res.json();
    return thunkAPI.rejectWithValue(comment);
  } catch (error) {
    return thunkAPI.rejectWithValue((error as Error).message);
  }
});

const ideasSlice = createSlice({
  name: "ideas",
  initialState,
  reducers: {
    // removeComment: (state, action: PayloadAction<string>) => {
    //   state.comments = state.comments.filter((comment) => comment.id !== action.payload);
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postComment.fulfilled, (state, action) => {
        state.username = action.meta.arg.author.login;
      })
      .addCase(postComment.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(removeComment.fulfilled, (state, action) => {
        const commentId = action.payload;
    
        state.comments = state.comments.filter((item) => item._id !== commentId);

        state.error = null;
      })
      .addCase(
        removeComment.rejected,
        (state, action: PayloadAction<string | unknown>) => {
          state.error = action.payload;
        }
      )
      
  },
});

export default ideasSlice.reducer;
