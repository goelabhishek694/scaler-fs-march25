import './App.css'
import Caraousel from './Components/Caraousel'
import FocusInput from './Components/FocusInput'
import Modal from './Components/Modal'
import Stopwatch from './Components/Stopwatch'
import Timer from './Components/Timer'
import useVisibility from './useVisibility'

function App() {
  const {isVisible, hide, show, toggle} = useVisibility(true);
  return (
    <>
    {/* <FocusInput/> */}
    {/* <Timer/> */}
    {/* <Stopwatch/> */}
    {/* <Caraousel/> */}
    <Modal isVisible={isVisible} hide={hide}/>
    </>
  )
}

export default App
