const express = require('express')
const app = express()
const port = 8000;

const db = require('./config/mongoose')
const ToDo = require('./models/todo')
app.set('views.engine', 'ejs')
app.set('views', './views')
app.use(express.static('assets'))
app.use(express.urlencoded())

app.listen(port, function(err) {
    if (err) {
        console.log(`Error in running the server at ${err}`)
    }
    console.log(`Server is running at port ${port}`)
})

