import movieSlice from "./movieSlice";
const actions = movieSlice.actions;

const fetchMiddleware = (params) => {
    return async function (dispatch) {
        console.log(params);
        console.log(typeof params);
        try{
            dispatch(actions.movieLoading(true));
            const resp = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=3aec63790d50f3b9fc2efb4c15a8cf99&language=en-US&page=${params}`);
            console.log(resp);
            const moviesObj = await resp.json();
            dispatch(actions.movieData(moviesObj.results));
        }catch(err){
            console.log(err);
            dispatch(actions.movieError());
        }
    }
}

export default fetchMiddleware;