import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store.ts';
import { useEffect } from "react";
import { fetchTasks } from "../slices/TasksSlise.ts";

const Tasks = () => {
  const taskValue = useSelector((state: RootState) => {
    console.log(state.tasks.tasks);
    return state.tasks;
  });
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
   dispatch(fetchTasks());
  }, [dispatch]);
  return <>
  {taskValue.tasks.map((task) => (
      <div key={task.id}>{task.title}</div>
    ))}</>;
};

export default Tasks;
