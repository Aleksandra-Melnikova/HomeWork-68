import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store.ts";
import { useEffect } from "react";
import Spinner from "../UI/Spinner/Spinner.tsx";
import {
  changeCheck,
  changeInputCheck,
  deleteTask,
  fetchTasks,
} from "../../containers/slices/TasksSlise.ts";

const Tasks = () => {
  const taskValue = useSelector((state: RootState) => {
    return state.tasks;
  });
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const onClickCheck = (id: string) => {
    dispatch(changeCheck(id));
    dispatch(changeInputCheck({ id: id }));
  };
  const onClickDelete = async (id: string) => {
    await dispatch(deleteTask({ idDelete: id }));
    dispatch(fetchTasks());
  };

  return (
    <div className={"container w-75"}>
      <h2 className="mx-4 text-center">To Do</h2>
      {taskValue.isLoading ? (
        <Spinner />
      ) : (
        <>
          {taskValue.tasks.length > 0 ? (
            <>
              {taskValue.tasks.map((task) => (
                <div
                  className="border border-1 border-secondary-subtle p-3 my-3 rounded-2 row justify-content-between align-items-center"
                  key={task.id}
                >
                  <div className="col-8 fs-3 task-title ">
                    <span className={"text-secondary"}>Task:</span> {task.title}
                  </div>
                  <div className="col-2 ms-auto">
                    <div className="form-check ">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckChecked"
                        onChange={() => onClickCheck(task.id)}
                        checked={task.status}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckChecked"
                      >
                        Task done
                      </label>
                    </div>{" "}
                  </div>
                  <button
                    type="button"
                    onClick={() => onClickDelete(task.id)}
                    className="d-block button-reset buttons-ic d-block pe-0 col-1 ms-0"
                  />
                </div>
              ))}
            </>
          ) : (
            <p className="mt-5 text-center">
              There are no tasks, add a new task to the TO DO list
            </p>
          )}{" "}
        </>
      )}
    </div>
  );
};

export default Tasks;
