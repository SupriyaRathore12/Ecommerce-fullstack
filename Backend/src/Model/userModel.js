const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({

    Name: {
        type: String,
        required: true,
        trim: true

    },
    Email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    Contact: {
        type: Number,
        required: true,
        unique: true
    },
    gender: {
        type: String,
        required: true,
        trim: true,
        enum: ["male", "female", "other"]

    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    Age: {
        type: Number,
        required: true,
        trim: true,

    },
    Address: {
        type: String,
        required: true,
        trim: true,

    },


},
    { timestamps: true }
);
module.exports=mongoose.model("User", UserSchema);