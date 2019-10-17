const mongoose = require('mongoose');

/*
name: String,
age: Number,
active:Boolean,*/
const UserSchema = new mongoose.Schema(
    {
        email: String,
    }

);

module.exports = mongoose.model('User', UserSchema)