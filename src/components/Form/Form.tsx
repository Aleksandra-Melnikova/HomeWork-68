import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../../app/store.ts";
import {
  changeTitle,
  clearForm,
  onSubmitTitle,
} from "../../containers/slices/FormSlice.ts";
import { fetchTasks } from "../../containers/slices/TasksSlise.ts";
import ButtonLoading from "../UI/ButtonLoading/ButtonLoading.tsx";

const Form = () => {
  const titleValue = useSelector((state: RootState) => {
    return state.form;
  });
  const dispatch: AppDispatch = useDispatch();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await dispatch(onSubmitTitle({ title: titleValue.title }));
    if (titleValue.title.trim().length > 0) {
      await dispatch(fetchTasks());
      dispatch(clearForm());
    }
  };

  return (
    <div className="container w-75">
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="form-group my-4 row justify-content-between align-items-center">
          <div className="col-10">
            <label
              className="fs-4 d-block mynpm i react-toastify-3"
              htmlFor="title"
            >
              Add a new task:
            </label>
            <input
              value={titleValue.title}
              onChange={(event) => dispatch(changeTitle(event.target.value))}
              type="text"
              id="title"
              className="form-control"
            />
          </div>
          <div className="col-2 mt-auto">
            <ButtonLoading
              text={"Add"}
              isLoading={titleValue.isLoading}
              isDisabled={titleValue.isLoading}
            />
          </div>

          {/*<button className="btn btn-primary col col-2 mt-auto" type="submit">*/}
          {/*  Add*/}
          {/*</button>*/}
        </div>
      </form>
    </div>
  );
};

export default Form;
