import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CounterRedux from './reduxComponents/CounterRedux'
import Todo from './reduxComponents/Todo'
import User from './reduxComponents/User'

function App() {
  const [count, setCount] = useState(0)

  return (
    // <CounterRedux/>
    // <Todo/>
    <User/>
  )
}

export default App
