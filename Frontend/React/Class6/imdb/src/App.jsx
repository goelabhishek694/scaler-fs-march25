import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import { Routes, Route } from "react-router";
import MovieList from './components/MovieList';
import Watchlist from './components/Watchlist';
import Header from './components/Header';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="/watchlist" element={<Watchlist />} />
      </Routes>
    </>
  )
}

export default App

// useEffect(() => {}, []) -> after comp is mounted -> loaded 

