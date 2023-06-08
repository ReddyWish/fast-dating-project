import { createSlice } from "@reduxjs/toolkit";
import commentService from "../services/comment.service";

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    entities: null,
    isLoading: true,
    error: null
  },
  reducers: {
    commentsRequested: (state) => {
      state.isLoading = true;
    },
    commentsReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    commentCreated: (state, action) => {
      state.entities.push(action.payload);
      state.isLoading = false;
    },
    commentRemoved: (state, action) => {
      console.log(action.payload);
      state.entities = state.entities.filter(c => c._id !== action.payload);
      state.isLoading = false;
    },
    commentRemoveFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    commentsRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    }
  }
});

const { reducer: commentsReducer, actions } = commentsSlice;

const {
  commentsRequested,
  commentsReceived,
  commentCreated,
  commentRemoveFailed,
  commentRemoved,
  commentsRequestFailed
} = actions;

export const loadCommentsList = (userId) => async (dispatch) => {
  dispatch(commentsRequested());
  try {
    const { content } = await commentService.getComments(userId);
    dispatch(commentsReceived(content));
  } catch (error) {
    dispatch(commentsRequestFailed(error.message));
  }
};

export const createComment = (payload) => async (dispatch) => {
  try {
    console.log(payload);
    const { content } = await commentService.createComment(payload);
    dispatch(commentCreated(content));
  } catch (error) {
    console.log(error);
  }
};

export const removeComment = (payload) => async (dispatch) => {
  try {
    const { content } = await commentService.removeComment(payload);
    console.log(content);
    if (content === null) {
      dispatch(commentRemoved(payload));
    }
  } catch (error) {
    dispatch(commentRemoveFailed(error.message));
  }
};
export const getComments = () => (state) => state.comments.entities;

export const getCommentsLoadingStatus = () => (state) => state.comments.isLoading;

export default commentsReducer;
