const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.connect("mongodb://localhost/weatherDB")

const citySchema = new Schema({
    name: String,
    temperature: Number,
    condition: String,
    conditionPic: String,
    fav: Boolean
})

const City = mongoose.model("city", citySchema)

module.exports = City