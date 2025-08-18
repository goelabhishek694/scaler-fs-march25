const router = require("express").Router();
const {addShow, deleteShow, updateShow, getTheatreAndShowsByMovieAndDate, showsByTheatre, showById } = require("../controller/show");

//add show
router.post("/", addShow);

//delete show
router.delete("/:showId", deleteShow);

//update show 
router.put("/:showId", updateShow);

//get all theatres by movie and date which has some shows 
router.get("/by-movie-date/:movie/:date", getTheatreAndShowsByMovieAndDate);

//get all shows by theatre
router.get("/:theatreId", showsByTheatre)

//get shows by id 
router.get("/show/:showId", showById);

module.exports = router;