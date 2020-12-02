// Server setup
const express = require('express')
const app = express()
const api = require('./server/routes/api')
const mongoose = require('mongoose')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Mongoose setup
mongoose.connect('mongodb://localhost/weatherDB', { useNewUrlParser: true })

app.use('/', api)

const port = 1301
app.listen(port, function () {
    console.log(`Running on port ${port}`)
})