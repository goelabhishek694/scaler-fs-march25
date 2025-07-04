import {createSlice} from "@reduxjs/toolkit";

const counterSlice = createSlice({
    name: "counterSlice",
    initialState: {
        count: 10,
        name: "Simran"
    },
    reducers: {
        //contain logic to update state 
        increment: (state) => {
            state.count += 1;
        },
        decrement: (state) => {
            state.count -= 1;
        }
    }
});

export default counterSlice