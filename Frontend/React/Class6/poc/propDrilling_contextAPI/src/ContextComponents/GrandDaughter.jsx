import React, {useContext} from 'react'
import { FamilyContext } from './Family';

function GrandDaughter() {
  const parentInfo = useContext(FamilyContext);
  return (
    <div className='gdaughter'>
      <h2>{`GrandDaughter ${parentInfo.familyName}`}</h2>
      </div>
  )
}

export default GrandDaughter