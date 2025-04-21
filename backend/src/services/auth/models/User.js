const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    FirstName:{
        type: String,
        required: true,
    },
    LastName:{
        type: String,
        required: true,
    },
    Email:{
        type: String,
        required: true,
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    Password:{
        type: String,
        required: true,
        minLength: 6,
        select: false
    },
    role:{
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});

//Encrypt password using bcrypt
UserSchema.pre('save', async function(next){
    if(!this.isModified('Password')){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.Password = await bcrypt.hash(this.Password, salt);
});

//Sign JWT and return
UserSchema.methods.getSignedJwtToken = function(){
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRATION_TIME
    });
};

//Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.Password);
};

//Export the model  
module.exports = mongoose.model('User', UserSchema);
// This code defines a Mongoose schema for a User model in a Node.js application. It includes fields for the user's first name, last name, email, password, role, and creation date. The password is hashed using bcrypt before saving to the database. The schema also includes methods for signing a JWT and matching passwords. Finally, the model is exported for use in other parts of the application.