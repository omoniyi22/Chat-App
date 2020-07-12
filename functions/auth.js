const {AuthenticationError} = require('apollo-server-express')
const {APP_REFRESH_SECRET, APP_SECRET, IN_PROD} = require( './../config')
const {User}  = require('../models')
const jwt  = require('jsonwebtoken')

require('dotenv').config()

module.exports.issueTokens = ({username, email, name, _id})=>{
    let token =  jwt.sign({username, email, name}, APP_SECRET,
        {expiresIn: 120
        })
    let refreshToken =  jwt.sign(
        { username, email, name}, 
        APP_REFRESH_SECRET,
        {expiresIn: "2d",}

    )
    return{
       token: token,
       refreshToken: refreshToken,
    }
}

module.exports.getAuthUser =  (request, requireAuth = false)=>{
    const {header} = request
    console.log('TOKEN_DECODED', request)

    if(header){
        const token = jwt.verify(header, APP_SECRET)
        console.log('TOKEN_DECODED', token)
        let authUser =  User.findById(token.id);
        if(!authUser){
            throw new AuthenticationError(
                "Invalid token, User Authentication failed"
            )
        }
        if(requireAuth){
            return authUser
        }else{
            return "HUO"
        }
    }
}