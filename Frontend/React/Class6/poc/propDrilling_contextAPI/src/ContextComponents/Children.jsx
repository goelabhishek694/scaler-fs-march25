import GrandSon from "./GrandSon.jsx";
import GrandDaughter from "./GrandDaughter";
import React, {useContext} from 'react'
import { FamilyContext } from './Family';

const Children = () => {
const parentInfo = useContext(FamilyContext);
    return(
        <div className="children">
            <h2>{`Children ${parentInfo.familyName}`}</h2>
            <GrandSon/>
            <GrandDaughter/>
        </div>
    );
}

export default Children;
