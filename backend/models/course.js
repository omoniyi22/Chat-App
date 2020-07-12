const mongoose = require('mongoose')
const { Schema, model } = mongoose

const CourseShema = new Schema({
    name: String,
    duration: String,
    collegeId: String
})

const Course = model('Course', CourseShema)
module.exports = Course