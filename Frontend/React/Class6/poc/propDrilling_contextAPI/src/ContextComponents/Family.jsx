import React, {createContext} from 'react'
import Parent from './Parent'
export const FamilyContext = createContext({"name":"abc"});
function Family() {
  return (
    <div className='family'>
        <Parent/>
    </div>
  )
}

export default Family