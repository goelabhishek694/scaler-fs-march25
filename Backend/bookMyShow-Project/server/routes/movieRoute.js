const router = require("express").Router();
const { addMovie, getAllMovies, updateMovie, deleteMovie } = require("../controller/movie");

//add a movie
router.post("/", addMovie);

//get all the movies
router.get("/", getAllMovies);

//update a movie
router.put("/:id", updateMovie);

//delete a movie
router.delete("/:id", deleteMovie);

module.exports = router;

