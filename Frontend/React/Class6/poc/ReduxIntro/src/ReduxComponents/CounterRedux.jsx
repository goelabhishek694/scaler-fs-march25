import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import counterSlice from '../redux/counterSlice';
const actions = counterSlice.actions;
// console.log(actions);

function CounterRedux() {
    const {count} = useSelector((store) => store.counterState);
    const dispatch = useDispatch();

    const handleIncrement = () => {
        console.log("increment will happen");
        dispatch(actions.increment());
        
    }

    const handleDecrement = () => {
        console.log("decrement will happen");
        dispatch(actions.decrement());
    }

  return (
    <div>
        <button onClick={handleIncrement}>+</button>
        <p>{count}</p>
        <button onClick={handleDecrement}>-</button>
    </div>
  )
}

export default CounterRedux