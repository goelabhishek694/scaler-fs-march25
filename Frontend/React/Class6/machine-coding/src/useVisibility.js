import { useCallback, useState } from "react";

function useVisibility(initialVisibility = false){
    const [isVisible, setIsVisible] = useState(initialVisibility);
    console.log(isVisible);
    
    const show = useCallback(() => {
        setIsVisible(true);
    },[])

    const hide = useCallback(() => {
        setIsVisible(false);
    },[]);

    const toggle = useCallback(() => {
        setIsVisible(prev => !prev);
    },[]);

    return {
        isVisible, show, hide, toggle
    }
}

export default useVisibility