import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import todoSlice from '../redux/todoSlice';
const actions = todoSlice.actions;
function TodoRedux() {
    const {value, list} = useSelector((store) => store.todoState);
    const dispatch = useDispatch();
    const handleChange = (e) => {
        //update the value state
        dispatch(actions.setValue(e.target.value));
    }

    const handleAddTask = () => {
        //update list array here
        dispatch(actions.setList(value));
    }
  return (
    <>
    <h2>Todo</h2>
    <div>
        <div className="inputBox">
            <input type="text" placeholder='Enter Your Task...' onChange={handleChange} value={value}/>
            <button onClick={handleAddTask}>Add</button>
        </div>
        <div className="list">
        {
            list.map((task, idx) => {
                return (
                    <li key={idx}>{task}</li>
                )
            })
        }
        </div>
    </div>
    </>
  )
}

export default TodoRedux