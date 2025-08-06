const router = require("express").Router();
const { addMovie, getAllMovies, updateMovie, deleteMovie } = require("../controller/movie");
const authMiddleware = require("../middleware/auth");

//add a movie
router.post("/", addMovie);

//get all the movies
router.get("/", getAllMovies);

//update a movie
router.put("/", updateMovie);

//delete a movie
router.delete("/", deleteMovie);

module.exports = router;

