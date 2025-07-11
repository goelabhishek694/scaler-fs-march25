import React, { useRef, useState } from 'react'

function Stopwatch() {
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    //check if timerRef is null or not
    const timerRef = useRef(null);
    const startTimer = () => {
        if(!isRunning){
            setIsRunning(true);
            timerRef.current = setInterval(() => {
                setSeconds(prevSeconds => prevSeconds+1);
            }, 1000);
        }
    }

    const stopTimer = () => {
        if(isRunning){
        clearInterval(timerRef.current);
        }
    }

    const resetTimer = () => {
        clearInterval(timerRef.current);
        setSeconds(0);
    }

    const formatTime = (time) => {
        const getSeconds = `0${time%60}`.slice(-2); 
        const minutes = Math.floor(time/60);
        const getMinutes = `0${minutes}`.slice(-2); 
        const getHours = `0${Math.floor(time/3600)}`.slice(-2);
        return  `${getHours}:${getMinutes}:${getSeconds}`
    }
  return (
    <>
        <h1>{formatTime(seconds)}</h1>
        <button onClick={startTimer}>Start</button>
        <button onClick={stopTimer}>Stop</button>
        <button onClick={resetTimer}>Reset</button>
    </>
  )
}

export default Stopwatch