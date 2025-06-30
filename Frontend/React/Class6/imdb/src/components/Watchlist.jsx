import React, { useEffect } from 'react'
import { useState } from 'react';
import genreids from '../utility';
function Watchlist() {
    const [watchlist, setWatchlist] = useState([]);

    useEffect(() => {
        let moviesFromLocalStorage = localStorage.getItem("watchlist");
        if(!moviesFromLocalStorage) return 
        setWatchlist(JSON.parse(moviesFromLocalStorage));
    },[])
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
            <table className="w-full bg-white text-left text-sm text-gray-500">
                <thead>  
                    <tr className="bg-gray-50">
                        <th className="px-6 py-4 font-medium text-gray-900">Name</th> 
                        <th>
                            <div className="flex">
                                <div>Ratings</div>
                            </div>
                        </th>
                        <th>
                            <div className="flex">
                                <div>Popularity</div>
                            </div>
                        </th>
                        <th>
                            <div className="flex">
                                <div>Genre</div>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 border-t border-gray-100"> 
                    { watchlist.map((movieObj) => {
                        return (
                            <tr className="hover:bg-gray-50">
                        <td className="flex items-center px-6 py-4 font-normal text-gray-900">
                            <img className="h-[6rem] w-[10rem] object-fit" src={`https://image.tmdb.org/t/p/w500/${movieObj.poster_path}`} alt="" />
                            <div className="font-medium text-gray-700 text-sm">{movieObj.title}</div>
                        </td>
                        <td className="pl-6 py-4">
                            {movieObj.vote_average}
                        </td>
                        <td className="pl-6 py-4">
                            {movieObj.popularity}
                        </td>
                        <td className="pl-2 py-4">
                        {genreids[movieObj.genre_ids[0]]}
                        </td>
                    </tr>
                        )
                    })
                    }
                </tbody>
            </table>
        </div>
    );
}

export default Watchlist