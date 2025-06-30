import { useEffect, useState } from "react";

const Pagination = ({ fetchMovies }) => {
    const [pageNo, setPageNo] = useState(1);
    const handlePrevious =() => {
        if(pageNo>1) setPageNo(pageNo-1);
    }

    const handleNext =() => {
        //10000 movies , 20 movies pp , totoal pages -> 500 
        if(pageNo<500) setPageNo(pageNo+1);
    }

    useEffect(() => {
        fetchMovies(pageNo);
    }, [pageNo]);
    
    return (
        <div className="flex justify-center gap-3 bg-gray-400 p-4 h-[50px] w-full mt-8">
            <div onClick={handlePrevious} className="px-8 text-xl">
            <i class="fa-solid fa-arrow-left"></i>
            </div>
            <div>{pageNo}</div>
            <div onClick={handleNext} className="px-8 text-xl">
            <i class="fa-solid fa-arrow-right"></i>
            </div>
        </div>
    )
}

export default Pagination;