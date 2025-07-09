import React from 'react'
import { useState, useMemo } from 'react';

const generateLargeArray = () => {
    const largeArray = [];
    for(let i=0;i<100000; i++){
        largeArray.push(i);
    }
    return largeArray
};

const sumArray = (arr) => {
    console.log("Calculating sum...");
    return arr.reduce((acc, curr)=>acc+curr, 0);
}

function LargeArraySum() {
    const [count, setCount] = useState(0); //only executed once (when component is mounted), does not execute on re-renders . 
    const largeArray = useMemo(() => generateLargeArray(), []);
    const sum = useMemo(() => sumArray(largeArray), [largeArray]);
  return (
    <div>
        <h1>Sum: {sum}</h1>
        <button onClick={() => setCount(count + 1)}>Increment</button>
        <p>Count: {count}</p>
    </div>
  )
}

export default LargeArraySum