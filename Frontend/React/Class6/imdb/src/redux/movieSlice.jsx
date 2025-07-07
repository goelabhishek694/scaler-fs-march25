import {createSlice} from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name: "movieSlice",
    initialState: {
        movies: [],
        error: null,
        loading: null
    },
    reducers: {
        movieLoading: (state, descObj) => {
            state.error = false;
            state.loading = descObj.payload;
        },
        movieError: (state) => {
            state.error = true;
            state.loading = false;
        },
        movieData: (state, descObj) => {
            state.error = false;
            state.loading = false;
            state.movies = descObj.payload;
        }
    }
});

export default movieSlice;