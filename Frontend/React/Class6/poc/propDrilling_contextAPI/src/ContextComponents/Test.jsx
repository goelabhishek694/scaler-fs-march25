import React, {useContext} from 'react'
import { FamilyContext } from './Family';

function Test() {
    const parentInfo = useContext(FamilyContext);
console.log("this is from Test, ", parentInfo);
  return (
    <div>Test</div>
  )
}

export default Test