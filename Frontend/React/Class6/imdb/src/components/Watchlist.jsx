import React, { useState, useEffect, useContext } from "react";
import genreids from "../utility";
import { MovieContext } from "../context/MovieContext";
function Watchlist() {
  const {watchlist, setWatchlist, addToWatchlist, removeFromWatchlist} = useContext(MovieContext);
  const [search,setSearch] = useState("");
  const [genreList, setGenreList] = useState([]);
  const [currGenre, setCurrGenre] = useState("All Genres");
  

  const handleAscendingRatings = () => {
    console.log("sorting low to high");
    let sortedAscending = watchlist.sort((objA, objB) => {
      return objA.vote_average - objB.vote_average;
    });
    console.log(sortedAscending);

    setWatchlist([...sortedAscending]);
  };

  const handleDescendingRatings = () => {
    console.log("sorting high to low");
    let sortedDescending = watchlist.sort((objA, objB) => {
      return objB.vote_average - objA.vote_average;
    });
    setWatchlist([...sortedDescending]);
  };

  useEffect(() => {
    let moviesFromLocalStorage = localStorage.getItem("watchlist");
    if (!moviesFromLocalStorage) return;
    setWatchlist(JSON.parse(moviesFromLocalStorage));
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  }

  useEffect(() => {
    const allGneres = watchlist.map(movieObj => {
        return genreids[movieObj.genre_ids[0]]
    });
    const uniqueGenres = new Set(allGneres);
    console.log(uniqueGenres);
    setGenreList(["All Genres",...uniqueGenres])
    
  }, [watchlist]);

  return (
    <>
      {/* Searchbar */}
      <div className="flex justify-center my-10">
        <input placeholder="Search Movies" className="h=[3rem] w-[18rem] bg-gray200 px-4 outline-none border border-slate-600" type="text" onChange={handleSearch} value={search}/>
      </div>

      {/* Genres */}
      <div className="flex justify-center gap-2">
        {genreList.map(genre => {
            return (
                <div className={currGenre==genre ? "flex justify-center items-center h-[3rem] w-[9rem] bg-blue-400 rounded-xl text-white" : "flex justify-center items-center h-[3rem] w-[9rem] bg-gray-400/50 rounded-xl text-white"} onClick={()=>setCurrGenre(genre)}>{genre}</div>
            )
        })}
      </div>
      
      {/* Watchlist */}
      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
        <table className="w-full bg-white text-left text-sm text-gray-500">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-4 font-medium text-gray-900">Name</th>
              <th>
                <div className="flex align-centre gap-2">
                  <i
                    class="fa-solid fa-arrow-up"
                    onClick={handleAscendingRatings}
                  ></i>
                  <div>Ratings</div>
                  <i
                    class="fa-solid fa-arrow-down"
                    onClick={handleDescendingRatings}
                  ></i>
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
              <th>
                <div className="flex">
                  <div>Delete Movies</div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {watchlist.filter(movieObj => movieObj.title.toLowerCase().includes(search.toLowerCase()))
            .filter(movieObj => {
                if(currGenre == "All Genres") return true;
                return genreids[movieObj.genre_ids[0]] == currGenre})
            .map((movieObj) => {
              return (
                <tr className="hover:bg-gray-50">
                  <td className="flex items-center px-6 py-4 font-normal text-gray-900">
                    <img
                      className="h-[6rem] w-[10rem] object-fit"
                      src={`https://image.tmdb.org/t/p/w500/${movieObj.poster_path}`}
                      alt=""
                    />
                    <div className="font-medium text-gray-700 text-sm">
                      {movieObj.title}
                    </div>
                  </td>
                  <td className="pl-6 py-4">{movieObj.vote_average}</td>
                  <td className="pl-6 py-4">{movieObj.popularity}</td>
                  <td className="pl-2 py-4">
                    {genreids[movieObj.genre_ids[0]]}
                  </td>
                  <td><button onClick={()=>removeFromWatchlist(movieObj)} className="text-red-500">Delete</button></td>
                </tr>
              );
            })}
            
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Watchlist;
