const express = require('express')
const axios = require('axios')
const router = express.Router()

const City = require('../models/city')

router.get('/city/:cityName', async function (req, res) {
    const cityName = req.params.cityName;
    const results = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=2c9cc7eeac9c575ec6c7b567e3e599ec`)
    const conditionPic = `http://openweathermap.org/img/wn/${results.data.weather[0].icon}@2x.png`
    const city = new City({
        name: cityName.charAt(0).toUpperCase() + cityName.slice(1),
        temperature: Math.floor(results.data.main.temp),
        condition: results.data.weather[0].description,
        conditionPic: conditionPic,
        fav: false
    })
    res.send(city)
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
        conditionPic: info.conditionPic,
        fav: true
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