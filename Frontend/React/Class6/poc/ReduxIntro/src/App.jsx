import './App.css'
import Counter from './Components/Counter'
import CounterRedux from './ReduxComponents/CounterRedux'
import TodoRedux from './ReduxComponents/TodoRedux'

function App() {

  return (
    <>
      <CounterRedux/>
      <TodoRedux/>
    </>
  )
}

export default App
