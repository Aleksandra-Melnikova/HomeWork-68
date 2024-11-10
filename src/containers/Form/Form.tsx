import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../../app/store.ts";
import { changeTitle, clearForm, onSubmitTitle } from '../slices/FormSlice.ts';
import { fetchTasks } from '../slices/TasksSlise.ts';


const Form = () => {
  const titleValue = useSelector((state: RootState) => {
    return state.form.title;
  });
  const dispatch: AppDispatch = useDispatch();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(onSubmitTitle({ title: titleValue }));
    dispatch(clearForm());
    dispatch(fetchTasks());
  };

  return (
    <div className='container w-75'>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="form-group my-4 row justify-content-between align-items-center">
          <div className='col-10'><label htmlFor="title">Add a new task:</label>
            <input
              value={titleValue}
              onChange={(event) => dispatch(changeTitle(event.target.value))}
              type="text"
              id="title"
              className="form-control"
            /></div>

          <button className="btn btn-primary col col-2 mt-auto" type="submit">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
