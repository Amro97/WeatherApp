const express = require('express')
const urllib = require('urllib')
const router = express.Router()

const City = require('../models/city')

router.get('/city/:cityName', async (req, res) => {
    const {cityName} = req.params
    const results = await urllib.request(`api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=2c9cc7eeac9c575ec6c7b567e3e599ec`)
    res.send(JSON.parse(results.data))
})

router.get('/cities', async (req, res) => {
    const cities = await City.find({})
    res.send(cities)
})

router.post('/city', (req, res) => {
    const info = req.body
    const city = new City({
        name: info.name,
        temperature: info.temperature,
        condition: info.condition,
        conditionPic: info.conditionPic
    })
    const promise = city.save()
    promise.then(res.send(city))
})

router.delete('/city/:cityName', async (req, res) => {
    const {cityName} = req.params
    const city = await City.deleteOne({name: cityName})
    res.send(city)
})

module.exports = router