import React, { useEffect, useState } from 'react'

function Banner() {
    const [bannerImage, setBannerImage]= useState("");
    const [movieTitle, setMovieTitle]= useState("");

    useEffect( () => {
        let getData = async () => {
        let res = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=3aec63790d50f3b9fc2efb4c15a8cf99&language=en-US&page=1`);
        let data = await res.json();
        let {backdrop_path, title} = data.results[0];
        setBannerImage(`https://image.tmdb.org/t/p/original${backdrop_path}`);
        setMovieTitle(title);
        };
        getData();
    })
  return (
    <div className ="h-[20vh] md:h-[75vh] bg-cover flex items-end" style={{backgroundImage:`url(${bannerImage})`}}>
        <div className='text-white w-full text-center text-2xl'>{movieTitle}</div>
    </div>
  )
}

export default Banner