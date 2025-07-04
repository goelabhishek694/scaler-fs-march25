import React from 'react'
import { useSelector } from 'react-redux';
import store from '../reactRedux/store';

function CounterRedux() {
    const {count} = useSelector((store) => store.counterState);
    
    const handleIncrement = () => {
        console.log("increment will happen");
        
    }
    
    const handleDecrement = () => {
        console.log("decrement will happen");
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