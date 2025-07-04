import {createSlice} from "@reduxjs/toolkit"

const todoSlice = createSlice({
    name: "todoSlice",
    initialState: {
        value: "",
        list: []
    },
    reducers: {
        setValue: (state, descObj) => {
            // console.log("i am a value", descObj.payload);
            
            state.value = descObj.payload
        },
        setList: (state, descObj) => {
            // console.log("i am list");
            const newTask = descObj.payload;
            state.list = [...state.list, newTask];
            state.value = "";
        }
    }
});

export default todoSlice;