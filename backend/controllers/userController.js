const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

// create token 
const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}

// login user 
const loginUser = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.login(email, password)

        // create a token 
        const token = createToken(user._id)
        const firstName = user.firstName
        const lastName = user.lastName

        res.status(200).json({email, firstName, lastName, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }

}

// sign up user
const signupUser = async (req, res) => {
    const {firstName, lastName, email, password} = req.body
    try {
        const user = await User.signup(firstName, lastName, email, password)

        // create a token 
        const token = createToken(user._id)

        res.status(200).json({firstName, lastName, email, token})
    } catch(error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {loginUser, signupUser}