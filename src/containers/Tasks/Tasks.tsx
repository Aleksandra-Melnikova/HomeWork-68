import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store.ts';
import { useEffect } from "react";
import { changeCheck, changeInputCheck, deleteTask, fetchTasks } from '../slices/TasksSlise.ts';

const Tasks = () => {
  const taskValue = useSelector((state: RootState) => {
    return state.tasks;
  });
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
   dispatch(fetchTasks());
  }, [dispatch]);
  const onClickCheck =  (id:string) => {
    dispatch(changeCheck(id));
    dispatch(changeInputCheck({id: id}));
  };
  const onClickDelete = (id:string)=>{
    dispatch(deleteTask({idDelete:id}));
    dispatch(fetchTasks());
  };


  return <div className={'container w-75'}>
    <h2 className='mx-4 text-center'>To Do</h2>
  {taskValue.tasks.map((task) => (
    <div className='border border-1 border-secondary-subtle p-3 my-3 rounded-2 row justify-content-between align-items-center'
         key={task.id}>
      <div className='col-10 fs-3'><strong>Task:</strong> {task.title}</div>
      <div className='col-2'>
        <div className="form-check ms-4">
          <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" onChange={()=>onClickCheck (task.id)} checked={task.status}/>
          <label className="form-check-label" htmlFor="flexCheckChecked">
            Task done
          </label></div>
          <button
            type="button"
            onClick={()=>(onClickDelete (task.id))}
            className="d-block button-reset buttons-ic d-flex align-items-center pe-0"
          />
        </div>

      </div>
      ))}</div>;
  };

    export default Tasks;
