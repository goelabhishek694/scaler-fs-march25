import { useEffect } from "react";
import { useState } from "react";
import Movie from "./Movie";
import Pagination from "./Pagination";

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [watchlist, setWatchlist] = useState([]);
    
    const fetchMovies = (pageNo=1) => {
        fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=3aec63790d50f3b9fc2efb4c15a8cf99&language=en-US&page=${pageNo}`)
            .then(res => res.json())
            .then(data => { console.log(data); setMovies(data.results)})
            .catch(() => {});
    }

    const addToWatchlist = (movie) => {
        const updatedWatchList = [...watchlist, movie];
        console.log(updatedWatchList);
        setWatchlist(updatedWatchList);
        localStorage.setItem("watchlist", JSON.stringify(updatedWatchList));
    }

    const removeFromWatchlist = (movie) => {
        const filteredMovies = watchlist.filter((movieObj) => {
            return movieObj.id != movie.id
        })
        console.log(filteredMovies);
        
        setWatchlist(filteredMovies);
        localStorage.setItem("watchlist", JSON.stringify(filteredMovies));
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

    useEffect(() => {
        let moviesFromLocalStorage = localStorage.getItem("watchlist");
        if(!moviesFromLocalStorage) return 
        // console.log(moviesFromLocalStorage);
        // console.log(typeof moviesFromLocalStorage);
        // console.log(typeof JSON.parse(moviesFromLocalStorage));
        // console.log(JSON.parse(moviesFromLocalStorage));
        setWatchlist(JSON.parse(moviesFromLocalStorage));
        
        
        // setWatchlist(moviesFromLocalStorage)
    }, [])

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