import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CounterRedux from './reduxComponents/CounterRedux'

function App() {
  const [count, setCount] = useState(0)

  return (
    <CounterRedux/>
  )
}

export default App
