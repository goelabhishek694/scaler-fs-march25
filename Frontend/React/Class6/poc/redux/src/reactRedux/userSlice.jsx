import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "userSlice",
    initialState: {
        user: null,
        error: "",
        loading: true,
        param: null

    },
    reducers: {
        //contain logic to update state 
        userLoading: (state) => {
            state.loading = true
        },
        userError: (state, descObj) => {
            state.error = descObj.payload;
            state.loading = false;
        },
        userData: (state, descObj) => {
            state.user = descObj.payload;
            state.loading = false;
        },
        setParam: (state, descObj) => {
            state.param = descObj.payload;
        }
    }
});

export default userSlice