import React from 'react'
import Parent from './Parent'

function Family({info}) {
  return (
    <div className='family'>
        <Parent info={info}/>
    </div>
  )
}

export default Family