import {createSlice} from "@reduxjs/toolkit";

const todoSlice = createSlice({
    name: "todoSlice",
    initialState: {
       value: "",
       list: ["task1", "task2"]
    },
    reducers: {
        setValue: (state, descObj) => {
            console.log("i am set value", descObj);
            state.value = descObj.payload;
        },
        addTask: (state, descObj) => {
            const updatedList = [...state.list, descObj.payload];
            state.list = updatedList;
            state.value = "";
        }
    }
});

export default todoSlice


// let y = 10;
// function foo(x,y){
//     y = 2*x;
//     x = y*x;
//     console.log("x", x, "y", y);
// }
// foo(5,2)