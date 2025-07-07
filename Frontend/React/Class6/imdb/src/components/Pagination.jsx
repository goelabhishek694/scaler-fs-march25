import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import paginationSlice from "../redux/paginationSlice";
import fetchMiddleware from "../redux/fetchMovieMiddleware";
const actions = paginationSlice.actions;

const Pagination = () => {
    const {pageNo} = useSelector((store) => store.paginationState);

    const dispatch = useDispatch();
    
    const handlePrevious =() => {
        dispatch(actions.handlePrevious())
    }

    const handleNext =() => {
        //10000 movies , 20 movies pp , totoal pages -> 500 
        dispatch(actions.handleNext())
    }

    useEffect(() => {
        dispatch(fetchMiddleware(pageNo))
    },[pageNo]);
    
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