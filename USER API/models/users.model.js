const mongoose = require('mongoose');

const user = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },

    email: {
        type: String,
        require: true,
        unique: true,
    },
   },
   { timestamps: true }
);

const userModel = mongoose.model('user', user );

module.exports = userModel;