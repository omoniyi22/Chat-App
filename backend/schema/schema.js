const graphql = require('graphql')
const College = require('../models/college')
const Course = require('../models/course')
const _ = require('lodash')
const { GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql
// var course = [
//     { name: "Economics", duration: "2 hours", id: "1", collegeId: "1" },
//     { name: "Agriculture", duration: "10 hours", id: "2", collegeId: "2" },
//     { name: "Finance", duration: "4 hours", id: "3", collegeId: "3" },
//     { name: "Accounting", duration: "5 hours", id: "4", collegeId: "4" },
//     { name: "Accounting", duration: "5 hours", id: "4", collegeId: "4" }
// ]
// var college = [
//     { name: 'Biller University', since: "20", id: '1', },
//     { name: 'Ka-loin University', since: "40", id: '2' },
//     { name: 'Juller University', since: "15", id: '3' },
//     { name: 'Estioer University', since: "38", id: '4' },
//     { name: 'Estioere University', since: "38", id: '4' }
// ]

const CollegeType = new GraphQLObjectType({
    name: 'college',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        since: { type: GraphQLInt },
        course: {
            type: new GraphQLList(CourseType),
            resolve(parent, args) {
                // return _.filter(course, { collegeId: parent.id })
                return Course.find({ collegeId: parent.id })
            }
        }
    })
})

const CourseType = new GraphQLObjectType({
    name: 'Course',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        duration: { type: GraphQLString },
        collegeId: { type: GraphQLID },
        college: {
            type: GraphQLList(CollegeType),
            resolve(parent, args) {
                // return _.filter(college, { id: parent.collegeId })
                return College.find({ _id: parent.collegeId })
            }
        }
    })
})


const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        course: {
            type: CourseType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                console.log(typeof (args.id))
                // return _.find(course, { id: args.id })
                return Course.findById(args.id)
            }
        },
        college: {
            type: CollegeType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // return _.find(college, { id: args.id })
                return College.findById(args.id)

            }
        },
        colleges: {
            type: new GraphQLList(CollegeType),
            resolve(parent, args) {
                // return college
                return College.find({})
            }
        },
        courses: {
            type: new GraphQLList(CourseType),
            resolve(parent, args) {
                return Course.find({})
            }
        }

    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addCourse: {
            type: CourseType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                duration: { type: new GraphQLNonNull(GraphQLString) },
                collegeId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args, { reqs }) {
                let course = new Course({
                    name: args.name,
                    duration: args.duration,
                    collegeId: args.collegeId
                })
                return course.save({})
            }
        },
        deleteCourse: {
            type: CourseType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                return Course.findByIdAndDelete(args.id)
            }

        },
        addCollege: {
            type: CollegeType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                since: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve(parent, args) {
                let college = new College({
                    name: args.name,
                    since: args.since
                })
                return college.save()
            }
        }

    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
}) 