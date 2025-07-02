import { useContext, useEffect } from "react";
import { useState } from "react";
import Movie from "./Movie";
import Pagination from "./Pagination";
import { MovieContext } from "../context/MovieContext";

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const {watchlist, setWatchlist, addToWatchlist, removeFromWatchlist} = useContext(MovieContext);
    const fetchMovies = (pageNo=1) => {
        fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=3aec63790d50f3b9fc2efb4c15a8cf99&language=en-US&page=${pageNo}`)
            .then(res => res.json())
            .then(data => { console.log(data); setMovies(data.results)})
            .catch(() => {});
    }

    const doesContain = (movie) => {
        for(let i=0;i<watchlist.length;i++){
            if(watchlist[i].id === movie.id) return true;
        }
        return false;
    }

    useEffect(() => {
        fetchMovies();
    }, []);

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
            <Pagination fetchMovies={fetchMovies} />
        </div>
    )
}

export default MovieList;