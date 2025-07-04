import {createSlice} from "@reduxjs/toolkit";

const counterSlice = createSlice({
    name: "counterSlice",
    initialState: {
        count: 10,
        name: "Simran"
    },
    reducers: {
        //contain logic to update state 
    }
});

export default counterSlice