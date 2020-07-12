let {gql} = require ('apollo-server-express')

module.exports.user = gql`
    extend type Query{
        profile: User!
        users:[User!]!
        refreshToken: Auth!
        login(username: String!, password: String!): Auth!
    }

    extend type Mutation{
        register(
            name: String!
            email: String!
            password: String!
            username: String!
        ): Auth!
    }

    type User{
        id: ID!
        username: String!
        email: String!
        password: String!
        name: String!
        createdAt: String!
        updatedAt: String!
    }

    type Auth{
        user: User!
        token: String!
        refreshToken: String!
    }
`