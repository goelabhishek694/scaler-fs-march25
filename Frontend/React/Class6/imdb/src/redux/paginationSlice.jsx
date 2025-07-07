import {createSlice} from "@reduxjs/toolkit";

const paginationSlice = createSlice({
    name: "paginationSlice",
    initialState: {
        pageNo: 1
    },
    reducers: {
        handleNext: (state) => {
            if(state.pageNo<500) {
                state.pageNo +=1
            }
        },
        handlePrevious: (state) => {
            if(state.pageNo>0) {
                state.pageNo -=1 
            }
        }
    }
})

export default paginationSlice