import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Goal from "../../types/Goal";
import SliceGoal from "../../types/SliceGoal";
import * as goalService from "./goalService";

const initialState: SliceGoal = {
  goals: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

// Create a goal
export const createGoal = createAsyncThunk(
  "goals/create",
  async (goalData: string, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await goalService.createGoal(goalData, token);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get user goals
export const getGoals = createAsyncThunk(
  "goals/getAll",
  async (_, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await goalService.getGoals(token);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete user goals
export const deleteGoal = createAsyncThunk(
  "goals/delete",
  async (id: string, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await goalService.deleteGoal(id, token);
    } catch (error: any) {
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const goalSlice = createSlice({
  name: "goals",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createGoal.fulfilled, (state, action: PayloadAction<Goal>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals.push(action.payload);
      })
      .addCase(createGoal.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getGoals.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGoals.fulfilled, (state, action: PayloadAction<Goal[]>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals = action.payload;
      })
      .addCase(getGoals.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        deleteGoal.fulfilled,
        (state, action: PayloadAction<{ id: string }>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.goals = state.goals.filter(
            (goal) => goal._id !== action.payload.id
          );
        }
      )
      .addCase(deleteGoal.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = goalSlice.actions;
export default goalSlice.reducer;
