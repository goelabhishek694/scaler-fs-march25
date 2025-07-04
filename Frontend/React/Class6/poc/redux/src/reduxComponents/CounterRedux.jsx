import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import store from '../reactRedux/store';
import counterSlice from '../reactRedux/counterSlice';
const actions = counterSlice.actions;

function CounterRedux() {
    //get initial state
    const {count} = useSelector((store) => store.counterState);

    //is used to call any method from reducer
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
    <>
        <h1>Counter Redux</h1>
        <button onClick = {handleIncrement}> + </button>
        <h3>{count}</h3>
        <button onClick = {handleDecrement}> - </button>
        </>
  )
}

export default CounterRedux