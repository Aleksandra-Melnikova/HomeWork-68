import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axiosAPI from "../../axiosAPI.ts";
import { RootState } from "../../app/store.ts";
import { toast } from "react-toastify";

interface FormState {
  title: string;
  status: boolean;
  isLoading: boolean;
  error: boolean;
}

const initialState: FormState = {
  title: "",
  status: false,
  isLoading: false,
  error: false,
};

export const onSubmitTitle = createAsyncThunk<
  void,
  { title: string },
  { state: RootState }
>("tasks/onSubmit", async (_arg, thunkAPI) => {
  const currentValueCounterFromState = thunkAPI.getState().form.title;
  if (currentValueCounterFromState) {
    await axiosAPI.post("tasks.json", {
      title: currentValueCounterFromState,
      status: false,
    });
  } else {
    toast.error("Fill in the field");
  }
});

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    changeTitle: (state: FormState, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    clearForm: (state: FormState) => {
      state.title = "";
      state.status = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(onSubmitTitle.pending, (state) => {
        state.isLoading = state.title.trim().length > 0;
        state.isLoading = true;
        state.error = false;
      })
      .addCase(onSubmitTitle.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(onSubmitTitle.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });
  },
});

export const formReducer = formSlice.reducer;

export const { changeTitle, clearForm } = formSlice.actions;
