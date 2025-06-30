import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import { Routes, Route } from "react-router";
import Watchlist from './components/Watchlist';
import Header from './components/Header';
import Home from './components/Home';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/watchlist" element={<Watchlist />} />
      </Routes>
    </>
  )
}

export default App

// useEffect(() => {}, []) -> after comp is mounted -> loaded 

