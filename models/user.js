const {model, Schema} = require( 'mongoose')

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
    },   
    {
        timestamps: true
    }
)

const user = model("User", UserSchema)
module.exports = user