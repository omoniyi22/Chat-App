const Joi = require('@hapi/joi')
const {loginValidator, registerValidator} = require('./../validators/user')
const {User} = require('./../../models')
const {issueTokens, getAuthUser} = require('./../../functions/auth')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


module.exports.user =  {
    Query:{  
        users: ()=>{},
        profile: async (root, args, {req}, info)=>{
            let Authuser = await getAuthUser(req, true)
            return {
                Authuser
            }
        },
        refreshToken:()=>{},
        login: async (root, args, {req}, info)=>{
            await loginValidator.validate(args, {abortEarly: true})
            // Check for user
            let user = await User.findOne({username: args.username})
            if(!user){
                throw new Error('Username not found')
            }
            // Compare password 
            // console.log(args.password, user.password)
            let isMatch = await bcrypt.compare(args.password, user.password)
            if(!isMatch){
                throw new Error("Invalid password.")
            }
            // Issue the token and refresh token
            let tokens = await issueTokens(user)
            return { 
                 user,
                 ...tokens
            }
        }}
    ,

    Mutation: {
        register: async ( root, args, {req}, info)=>{
            // validate the User Data
            await registerValidator.validate(args,  {abortEarly: true})

            // Check if the user is already there
            let user = await User.findOne({username: args.username});
            
            if(user){
                throw new Error("");
            }
            user = await User.findOne({email: args.email})
            if(user){
                throw new Error("Email is already taken")
            }
            // That means user registration is valid
            args.password = await bcrypt.hash(args.password, 10);
            let newUser = await User.create(args)   
            let tokens = await issueTokens(newUser)
            console.log({token: tokens})
            return { 
                user: newUser,
                    ...tokens
            }
        }
    }   
}