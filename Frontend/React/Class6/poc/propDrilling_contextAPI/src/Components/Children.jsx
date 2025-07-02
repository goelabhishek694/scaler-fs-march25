import GrandSon from "./GrandSon.jsx";
import GrandDaughter from "./GrandDaughter";


const Children = ({info}) => {

    return(
        <div className="children">
            <h2>{`Children ${info.familyName}`}</h2>
            <GrandSon info={info}/>
            <GrandDaughter info={info}/>
        </div>
    );
}

export default Children;
