import React, {createContext} from 'react'
import Parent from './Parent'
export const FamilyContext = createContext({"familyName":"abc"});
function Family() {
  return (
    <div className='family'>
        <Parent/>
    </div>
  )
}

export default Family