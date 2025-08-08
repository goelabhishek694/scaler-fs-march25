const Theatres = require("../models/theatreModel");

exports.addTheatre = async (req, res) => {
  try {
    //create a new theatre document using theatre model 
    const newTheatre = new Theatres(req.body);
    //save the theatre document 
    await newTheatre.save();
    // send a response with success and message key
    res.status(201).json({
        "success": true,
        "message": "New theatre added"
    })
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};

exports.allTheatres = async (req, res) => {
  try{
    const allTheatres = await Theatres.find().populate("owner");
    res.json({
      success: true,
      message: "all theatres fetched",
      data: allTheatres
    })
  }catch(err){
    res.json({
      success: false,
      message: err.message,
    });
  }
}

exports.theatreByOwner = async (req, res) => {
  try{
    const {ownerId} = req.params;
    const allTheatres = await Theatres.find({owner: ownerId});
    res.json({
      success: true,
      message: "all theatres fetched",
      data: allTheatres
    })
  }catch(err){
    res.json({
      success: false,
      message: err.message,
    });
  }
}
exports.updateTheatre = async (req, res) => {
  try {
    const {id}= req.params;
    await Theatres.findByIdAndUpdate(id, req.body);
    // send a response with success and message key
    res.status(200).json({
        "success": true,
        "message": "theatre updated"
    })
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};

exports.deleteTheatre = async (req, res) => {
  try {
    const {id}= req.params;
    await Theatres.findByIdAndDelete(id)
    // send a response with success and message key
    res.status(200).json({
        "success": true,
        "message": "theatre deleted"
    })
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};