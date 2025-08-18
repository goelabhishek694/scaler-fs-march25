const Movies = require("../models/movieModel");

exports.addMovie = async (req, res) => {
  try {
    //create a new movie document using movie model 
    const newMovie = new Movies(req.body);
    //save the movie document 
    await newMovie.save();
    // send a response with success and message key
    res.status(201).json({
        "success": true,
        "message": "New movie added"
    })
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};

exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movies.find();
    res.status(201).json({
        "success": true,
        "message": "all movies fetched",
        data: movies
    })
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};

exports.updateMovie = async (req, res) => {
  try {
    const {id}= req.params;
    await Movies.findByIdAndUpdate(id, req.body);
    // send a response with success and message key
    res.status(200).json({
        "success": true,
        "message": "movie updated"
    })
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};

exports.deleteMovie = async (req, res) => {
  try {
    const {id}= req.params;
    await Movies.findByIdAndDelete(id)
    // send a response with success and message key
    res.status(200).json({
        "success": true,
        "message": "movie deleted"
    })
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};

exports.getMovieById = async (req, res) => {
  try {
    const {movieId}= req.params;
    const movie = await Movies.findById(movieId)
    // send a response with success and message key
    res.status(200).json({
        "success": true,
        "message": "movie fetched",
        data: movie
    })
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};