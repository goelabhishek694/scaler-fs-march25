const router = require("express").Router();
const { addMovie, getAllMovies, updateMovie, deleteMovie, getMovieById } = require("../controller/movie");

//add a movie
router.post("/", addMovie);

//get all the movies
router.get("/", getAllMovies);

//update a movie
router.put("/:id", updateMovie);

//delete a movie
router.delete("/:id", deleteMovie);

//get movie by id 
router.get("/:movieId", getMovieById)

module.exports = router;

