import React, {useContext} from 'react'
import { FamilyContext } from './Family';

function GrandSon() {
  const parentInfo = useContext(FamilyContext);
  return (
    <div className='gson'>
      <h2>{`GrandSon ${parentInfo.familyName}`}</h2>
      </div>
  )
}

export default GrandSon