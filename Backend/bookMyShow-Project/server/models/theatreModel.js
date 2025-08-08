const mongoose = require("mongoose");

const theatreSchema = new mongoose.Schema({
    name: {
        type: "String",
        required: true
    },
    address: {
        type: "String",
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: "String",
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    isActive: {
        type: Boolean,
        required: true
    }
}, {timestamps: true});

const Theatres = mongoose.model("theatre", theatreSchema);

module.exports = Theatres