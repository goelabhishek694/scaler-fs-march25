import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Family from './ContextComponents/Family'
import { FamilyContext } from './ContextComponents/Family'
import Test from './ContextComponents/Test'

function App() {
  // const [count, setCount] = useState(0);
  const familyInfo = {
    familyName: "The Griffins",
  
    onlyForParents : () => {
      console.log("Info for Parents");
    },
  
    onlyForGrandChildren : () => {
      console.log("Info for GrandChildren");
    }
  }
  

  return (
    <>
    <FamilyContext.Provider value={familyInfo}>
      <Family/>
    </FamilyContext.Provider>
    <Test/>
    </>

  )
}

export default App
