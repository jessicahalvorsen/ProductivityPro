const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String, 
        required: true, 
        unique: true
    },
    password: {
        type: String, 
        required: true
    }
})

// static sign up method 
userSchema.statics.signup = async function(email, password) {
    // validate email and password 
    if(!email || !password){
        throw Error('All fields must be filled')
    }
    if(!validator.isEmail(email)){
        throw Error('Not a valid email')
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough')
    }

    // make sure the email is not already in use 
    const exists = await this.findOne({email})
    if(exists) {
        throw Error('Email already in use')
    }

    // encrypt the password 
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    // create user with email and hashed password 
    const user = await this.create({email, password:hash})

    return user
}

// static login method 
userSchema.statics.login = async function(email, password) {
    // validate email and password exists in db
    if(!email || !password){
        throw Error('All fields must be filled')
    }

    // look for user with that email 
    const user = await this.findOne({email})
    if(!user) {
        throw Error('Incorrect email')
    }

    //compare password 
    const match = await bcrypt.compare(password, user.password)
    if(!match) {
        throw Error('Incorrect password')
    }

    return user 
}

module.exports = mongoose.model('User', userSchema)