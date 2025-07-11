import React, { useEffect, useRef, useState } from 'react'

function Timer() {
    const [seconds,setSeconds] = useState(0);
    // let [timerId,setTimerId] = useState(0);
    const timerId = useRef(null); //234
    useEffect(() => {
        timerId.current = setInterval(() => {
            setSeconds(prevSeconds => prevSeconds+1);
        }, 1000);
        // setTimerId(timerId);

        return () => {
            clearInterval(timerId.current);
        }
    }, []);


    const stopTimer = () => {
        clearInterval(timerId.current);
    }
  return (
    <>
    <p>Seconds: {seconds}</p>
    <button onClick={stopTimer}>Stop Timer</button>
    </>
  )
}

export default Timer