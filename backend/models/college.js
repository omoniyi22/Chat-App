const mongoose = require('mongoose')
let { Schema, model } = mongoose

const CollegeSchema = Schema({
    name: String,
    since: Number
})

module.exports = model('College', CollegeSchema)