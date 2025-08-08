const router = require("express").Router();
const { addTheatre, updateTheatre,  deleteTheatre, allTheatres, theatreByOwner } = require("../controller/theatre");

//add a theatre
router.post("/", addTheatre);

//get all theatres
router.get("/all", allTheatres)

//get theatres of a specific owner
router.get("/owner/:ownerId", theatreByOwner)

//update a theatre
router.put("/:id", updateTheatre);

//delete a theatre
router.delete("/:id", deleteTheatre);

module.exports = router;

