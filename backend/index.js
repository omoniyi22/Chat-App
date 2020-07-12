const  express = require('express')
let {ApolloServer} =  require('apollo-server-express')
const mongoose = require('mongoose')
let {typeDefs} = require( '../graphql/typeDefs')
let {resolvers} = require( '../graphql/resolvers')
let  consola = require( 'consola')
const {DB, IN_PROD, APP_PORT} = require( '../config')

//intialize th application
const app = express()

//setting the middleware
app.disable("x-powered-by")

//seting apollo-express-server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: !IN_PROD
    ? false : {
        settings :
        {
            'request.credentials' : 'include',
        },
    },
})


const build_path = path.join(__dirname, '../..', 'build')
app.use(express.static(build_path))
app.get('/*', (req, res) => {
	res.sendFile(path.join(build_path, 'index.html'))
})
// }


// let DB = 'mongodb://localhost:27017/'
let DB = 'mongodb+srv://seun2322:seun2322@betanews-igci1.mongodb.net/test?retryWrites=true'






//Start application functions
const startApp = async () => {
    try{
await mongoose.connect(DB, { useUnifiedTopology: true, useNewUrlParser: true })
.then(() => console.log('database is connected'))
consola.success({
    message: "Sucessfully connnected to the database",
    badge: true
})
server.applyMiddleware({app, cors: false})
app.listen({port: APP_PORT}, ()=>{
    consola.success({
        message: `Apollo server stsarted on \nhttp:\\localhost:${APP_PORT}${server.graphqlPath} \n ${DB}`,
        badge: true
    })
})
    }catch(err){
consola.error({
    message: `Unable to start the server \n${err.message}`,
    badge:true
})
    }
}

startApp()