const manager = new Manager()
const renderer = new Renderer()

const loadPage = async function () {
    await manager.getDataFromDB()
    renderer.renderData(manager.cityData)
}

const handleSearch = function () {
    const cityName = $('#city-input').val()
    $('#city-input').val('')
    manager.getCityData(cityName).then(() => {
        renderer.renderData(manager.cityData)
    })
}

$('#cities').on('click', '.add-btn', async function () {
    const cityName = $(this).closest('.city').data().name
    $(this).removeClass("add-btn")
    $(this).addClass("remove-btn")
    $(this).text("-")
    await manager.saveCity(cityName)
})

$('#cities').on('click', '.remove-btn', async function () {
    const cityName = $(this).closest('.city').data().name
    $(this).removeClass("remove-btn")
    $(this).addClass("add-btn")
    $(this).text("+")
    await manager.removeCity(cityName)
})

loadPage()