import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import todoSlice from '../reactRedux/todoSlice';
const actions = todoSlice.actions;
function Todo() {
    const {value,list} = useSelector((store) => store.todoState) ;
    const dispatch = useDispatch();
    const handleChange = (e) => {
        const newTask = e.target.value;
        dispatch(actions.setValue(newTask));
    }

    const handleAddTask = () => {
        dispatch(actions.addTask(value));
    }
  return (
    <>
    <h2>Todo</h2>
    <div>
        <div className="inputBox">
            <input type='text' placeholder='enter your task' onChange={handleChange} value={value}/>
            <button onClick={handleAddTask}>Add</button>
        </div>
        <div className="list">
            <ul>
                {
                    list.map((task, idx) => {
                        return (
                            <li key={idx}>{task}</li>
                        )
                    })
                }
            </ul>
        </div>
    </div>
    </>
  )
}

export default Todo