const Joi = require("@hapi/joi")

const name = Joi.string().max(225).required().label('Name');
const email = Joi.string().email().required().label("Email")
const username = Joi.string().max(255).min(6).required().label("Username")
const password = Joi.string()
    .max(30)
    .min(8)
    .required()
    // .regex(/^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)).*$/)
    .label("Password")
    .options({
        messages: {
            "string.regex":" Must have atleast one lowercase letter, one uppercase letter and one digit."
            // {
                // regex:{
                //     base:
                //     "Must have atleast one lowercase letter, one uppercase letter and one digit."
                // },
            // },
        },
    })

module.exports.loginValidator = Joi.object({
    username,
    password,
})
module.exports.registerValidator = Joi.object({
    name,
    email,
    username,
    password
})