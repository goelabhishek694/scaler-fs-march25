import React, { useContext } from 'react'
import Children from './Children'
import { FamilyContext } from './Family';
function Parent() {
    const parentInfo = useContext(FamilyContext);
    console.log("this is from parents, ", parentInfo);
    
  return (
    <div className='parent'>
        <h2>{`Parent ${parentInfo.familyName}`}</h2>
        <h3>{parentInfo.onlyForParents()}</h3>
        <Children/>
    </div>
  )
}

export default Parent