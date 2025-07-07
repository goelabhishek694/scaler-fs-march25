import { useContext } from "react";
import Movie from "./Movie";
import Pagination from "./Pagination";
import { MovieContext } from "../context/MovieContext";
import {useSelector } from "react-redux";

const MovieList = () => {
    const {movies, error, loading} = useSelector((store) => store.movieState);
    const {watchlist, setWatchlist, addToWatchlist, removeFromWatchlist} = useContext(MovieContext);

    const doesContain = (movie) => {
        for(let i=0;i<watchlist.length;i++){
            if(watchlist[i].id === movie.id) return true;
        }
        return false;
    }

    return (
        <div className="movie-list-page">
            <h2>Movies</h2>
            <div className="movie-list">
                {
                    movies.map(movie => (
                        <Movie movie={movie} addToWatchlist={addToWatchlist} removeFromWatchlist={removeFromWatchlist} doesContain={doesContain}/>
                    ))
                }
            </div>
            <Pagination />
        </div>
    )
}

export default MovieList;