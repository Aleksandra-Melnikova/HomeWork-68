import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axiosAPI from "../../axiosAPI.ts";
import { RootState } from "../../app/store.ts";

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

// export const fetchTitile = createAsyncThunk('tasks/fetchTasks', async ()=>{
//     const {data:tasks} = await axiosAPI<number | null>('tasks.json');
//     return tasks|| 0;
// });

// export const onSubmit = createAsyncThunk('tasks/onSubmit ', async ()=>{
//   const currentValueCounterFromState = thunkAPI.getState().counter.value;
//   const {data:tasks} = await axiosAPI.post<string>('tasks.json', tasks.title);
//   return tasks|| 0;
// });
export const onSubmitTitle = createAsyncThunk<
  void,
  { title: string },
  { state: RootState }
>("tasks/onSubmit", async (_arg, thunkAPI) => {
  const currentValueCounterFromState = thunkAPI.getState().form.title;
  await axiosAPI.post("tasks.json", { title: currentValueCounterFromState });
  console.log(_arg);
});

// export const changeInput = (e: React.ChangeEvent<HTMLInputElement>, state:RootState) => {
//   state.title = e.target.value;
// };

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    changeTitle: (state: FormState, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    // increaseByNumber: (state:CounterState, action:PayloadAction<number>) => {
    //     state.value += action.payload;
    // },
    //
    // decrease: (state) => {
    //     state.value -= 1;
    // },
  },
  extraReducers(builder) {
    builder
      .addCase(onSubmitTitle.pending, (state) => {
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
    //     .addCase(changeCounterValue.pending, (state) => {
    //     state.isLoading = true;
    //     state.error = false;
    // })
    //     .addCase(changeCounterValue.fulfilled, (state) => {
    //         state.isLoading = false;
    //
    //     })
    //     .addCase(changeCounterValue.rejected, (state) => {
    //         state.isLoading = false;
    //         state.error = true;
    //     });
  },
});

export const formReducer = formSlice.reducer;

export const { changeTitle } = formSlice.actions;
