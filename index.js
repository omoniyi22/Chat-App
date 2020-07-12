const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT =  4001;
const cors = require('cors')
const path = require('path')
const schema = require('./backend/schema/schema')

app.use(cors())

const GraphQlHTTP = require("express-graphql")

app.use('/graphiql', GraphQlHTTP({
    schema,
    graphiql: true
}))

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

// if (process.env.NODE_ENV === 'production') {
    const build_path = path.join(__dirname, 'client', 'build')
    app.use(express.static(build_path))
    app.get('*', (req, res) => {
        res.sendFile(path.join(build_path, 'index.html'))
    })
// }

let db = 'mongodb://localhost:27017/GraphSchool'
// let db = 'mongodb+srv://seun2322:seun2322@betanews-igci1.mongodb.net/test?retryWrites=true'


mongoose.connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log('database is connected'))

app.listen(PORT, () => {
    console.log('server is working', PORT);
})