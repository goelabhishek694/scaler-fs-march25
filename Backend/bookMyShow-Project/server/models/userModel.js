const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    role:{
        type:String,
        enum: ["admin", "user", "partner"],
        required: true,
        default: "user"
    }
}, {timestamps: true});

userSchema.pre("save", function(next){
    console.log("hello from pre");
    this.confirmPassword = undefined;
    next();
})

// userSchema.pre("save", function(next){
//     console.log("hello from pre");
//     const date = new Date();
//     this.updatedAt = date;
//     if(!this.createdAt){
//         this.createdAt = date;
//     }
//     next();
// })

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;