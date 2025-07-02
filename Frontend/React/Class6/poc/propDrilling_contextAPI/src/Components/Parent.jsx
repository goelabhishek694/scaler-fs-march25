import React from 'react'
import Children from './Children'
function Parent({info}) {
    console.log("this is from parents, ", info);
    
  return (
    <div className='parent'>
        <h2>{`Parent ${info.familyName}`}</h2>
        <h3>{info.onlyForParents()}</h3>
        <Children info={info}/>
    </div>
  )
}

export default Parent