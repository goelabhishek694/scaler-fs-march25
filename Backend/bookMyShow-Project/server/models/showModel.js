const { HostAddress } = require("mongodb");
const mongoose = require("mongoose");

const showSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "movies"
    },
    ticketPrice: {
        type: Number,
        required: true
    },
    totalSeats: {
        type: Number,
        required: true
    },
    bookedSeats: {
        type: Array,
        default: []
    },
    theatre:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "theatres"
    }
}, {timestamps: true});

const Shows = mongoose.model("show", showSchema);

module.exports = Shows