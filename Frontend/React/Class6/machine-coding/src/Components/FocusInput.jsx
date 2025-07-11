import React, { useRef } from 'react'

function FocusInput() {
    const inputRef = useRef(null);
    console.log(inputRef);

    const focusInput = () => {
        inputRef.current.focus();
    }
    
  return (
    <div>
        <input type='text' ref = {inputRef}/>
        <button onClick={focusInput}>Focus Input</button>
    </div>
  )
}

export default FocusInput