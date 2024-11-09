import { configureStore } from "@reduxjs/toolkit";
import { formReducer } from "../containers/slices/FormSlice.ts";
import { tasksReducer } from "../containers/slices/TasksSlise.ts";

export const store = configureStore({
  reducer: {
    form: formReducer,
    tasks: tasksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
