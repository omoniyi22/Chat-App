let {gql} = require ('apollo-server-express')

module.exports.root = gql`
    type Query{
        _: String!
    }
    type Mutation{
        _: String!
    }

`
