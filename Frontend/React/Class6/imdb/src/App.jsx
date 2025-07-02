import "./App.css";
import { Routes, Route } from "react-router";
import Watchlist from "./components/Watchlist";
import Header from "./components/Header";
import Home from "./components/Home";
import MovieContextWrapper from "./context/MovieContext";

function App() {
  return (
      <MovieContextWrapper>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/watchlist" element={<Watchlist />} />
        </Routes>
      </MovieContextWrapper>
  );
}

export default App;
