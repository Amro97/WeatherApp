class Manager {

    constructor() {
        this.cityData = [];
    }

    async getDataFromDB(){
        const cities = await $.get('/cities')
        this.cityData = cities
    }

    async saveCity(cityName) {
        const city = this.cityData.find(c => c.name == cityName)
        await $.post('/city', city)
    }

    async getCityData(cityName) {
        const city = await $.get(`/city/${cityName}`)
        this.cityData.push(city)
    }

    async removeCity(cityName) {
        await $.ajax({
            url: `/city/${cityName}`,
            method: "DELETE",
            success: function () { }
        })
    }
}