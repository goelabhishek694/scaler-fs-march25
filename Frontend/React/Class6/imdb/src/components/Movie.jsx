import { useState } from "react"

const Movie = ({movie, addToWatchlist, removeFromWatchlist, doesContain}) => {
    
    return (
        <div className="movie">
            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
            <h4>{movie.title}</h4>
            {
                doesContain(movie) == false ? 
            <div onClick={() => addToWatchlist(movie)} className="m-4">😍</div>:
            <div onClick={() => removeFromWatchlist(movie)}>❌</div>
}
        </div>
    )
}

export default Movie;


