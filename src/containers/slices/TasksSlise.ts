import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axiosAPI from "../../axiosAPI.ts";
import { IDataFromAPI, ITask } from "../../types";
import { RootState } from "../../app/store.ts";

interface TasksState {
  tasks: ITask[];
  isLoading: boolean;
  error: boolean;
}

const initialState: TasksState = {
  tasks: [],
  isLoading: false,
  error: false,
};

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const { data: tasks } = await axiosAPI<IDataFromAPI | null>("tasks.json");
  return tasks || 0;
});

export const changeInputCheck = createAsyncThunk<
  void,
  { id: string },
  { state: RootState }
>("tasks/changeInputCheck", async (_arg, thunkAPI) => {
  let currentObg;
  for (let index = 0; index < thunkAPI.getState().tasks.tasks.length; index++) {
    if (thunkAPI.getState().tasks.tasks[index].id === _arg.id) {
      currentObg = thunkAPI.getState().tasks.tasks[index];
    }
  }
  await axiosAPI.put(`tasks/${_arg.id}.json`, currentObg);
});

export const deleteTask = createAsyncThunk<
  void,
  { idDelete: string },
  { state: RootState }
>("tasks/deleteTask", async (_arg) => {
  await axiosAPI.delete(`tasks/${_arg.idDelete}.json`);
});

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    changeCheck: (state: TasksState, action: PayloadAction<string>) => {
      state.tasks.map((task) => {
        if (task.id === action.payload) {
          task.status = !task.status;
        }
      });
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        const responseNew = Object.entries(action.payload);
        const array: ITask[] = [];
        for (let i = 0; i < responseNew.length; i++) {
          const obj: ITask = {
            id: responseNew[i][0],
            title: responseNew[i][1].title,
            status: responseNew[i][1].status,
          };
          array.push(obj);
        }
        state.tasks = array;
      })
      .addCase(fetchTasks.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      })
      .addCase(changeInputCheck.pending, (state) => {
        state.isLoading = false;
        state.error = false;
      })
      .addCase(changeInputCheck.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(changeInputCheck.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      })
      .addCase(deleteTask.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(deleteTask.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteTask.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });
  },
});

export const tasksReducer = tasksSlice.reducer;

export const { changeCheck } = tasksSlice.actions;
