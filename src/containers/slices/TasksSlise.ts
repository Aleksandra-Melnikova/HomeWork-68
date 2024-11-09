import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axiosAPI from '../../axiosAPI.ts';
import { IDataFromAPI, ITask } from '../../types';

interface TasksState {
  tasks: ITask[]
  isLoading: boolean;
  error: boolean;
}

const initialState:TasksState  = {
tasks:[],
  isLoading: false,
  error: false,
};

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async ()=>{
    const {data:tasks} = await axiosAPI<IDataFromAPI | null>('tasks.json');
    return tasks || 0;
});
//
// export const fetchTasks = createAsyncThunk<void,void,>('tasks/fetchTasks', async (_arg,)=>{
//   const response = await axiosAPI('tasks.json');
//   const tasksObjects:IDataFromAPI = response.data;
//  const tasks = Object.keys(response.data).map((taskID: string) => {
//     return {
//       id: taskID,
//       title: tasksObjects[taskID].title
//     };
//   })
//     console.log(tasks);

 //    return tasks
 // });



export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    getData: (state: TasksState, action: PayloadAction<IDataFromAPI>) => {
      if(action.payload){
        const tasksObjects = action.payload;
        state.tasks = Object.keys(tasksObjects).map((taskID: string) => {
          return {
            id: taskID,
            title: tasksObjects[taskID].title,
            status: false,
          };
        }) ;
      }

    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(fetchTasks.fulfilled, (state,action) => {
        state.isLoading = true;
        const postResponseNew = Object.entries(action.payload);
        const array: ITask[] = [];
        for (let i = 0; i < postResponseNew.length; i++) {
          const obj: ITask= {
            id: postResponseNew[i][0],
            title: postResponseNew[i][1].title,
            status:false,
          };
          array.push(obj);
        }
        state.tasks = array;
      })
      .addCase(fetchTasks.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });
  }
});

export const  tasksReducer = tasksSlice.reducer;

export const {getData} =  tasksSlice.actions;