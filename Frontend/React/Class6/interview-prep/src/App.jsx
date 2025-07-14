import './App.css'
import Welcome from './Components/Welcome'
import Counter from './Components/Counter'
import TodoList from './Components/TodoList'
import withLoading from './Components/WithLoading'
import DataComponent from './Components/DataComponent'

function App() {
  const EnhancedComponent = withLoading(DataComponent);
  return (
    <>
      {/* <Welcome name="Arunava"/>
      <Counter/>
      <TodoList/> */}
      <EnhancedComponent data="here is some data"/>
    </>
  )
}

export default App
