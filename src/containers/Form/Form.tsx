import {useDispatch, useSelector} from "react-redux";

import {AppDispatch, RootState} from "../../app/store.ts";
import { changeTitle, onSubmitTitle } from './FormSlice.ts';


const Form = () => {
    const titleValue = useSelector((state: RootState)=> {
        return state.form.title;
    });
    const dispatch:AppDispatch = useDispatch();

//     useEffect(() => {
// dispatch(fetchTasks());
//     },[dispatch]);
    // const changeValueInApi = async () =>{
    //     await dispatch(changeCounterValue({name:'Albina'}));
    // };

const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  dispatch(onSubmitTitle({title:titleValue}));
};

    return (
        <div>
          <form onSubmit={(e) =>onSubmit(e)}>
            <div className="form-group mb-2">
            <label htmlFor="title">Title:</label>
            <input
              value={titleValue}
              onChange={(event) => dispatch(changeTitle(event.target.value))}
              type="text"
              id='title'
              className="form-control"
            />
              <button className="btn btn-primary" type="submit">Add</button>
        </div>
</form>
</div>
)
  ;
};

export default Form;