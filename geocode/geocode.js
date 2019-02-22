const request = require('request')

const geocodeAddress = (userAddress, callback) => {
    const address = encodeURIComponent(userAddress)

    request({
        url: `http://www.mapquestapi.com/geocoding/v1/address?key=rvZTAZLGjcGpRAQdnfoCfQhisYoOtTOb&location=${address}`,
        json: true
    }, (error, response, body) => {
        // console.log(error) // 에러 없으면 값이 null
        // console.log(JSON.stringify(body, undefined, 2)) // Pretty Pringting for Node

        if (error) {
            callback('Unable to connect to API address')
        } else if (body.info.statuscode > 0) {
            callback('Unable to fetch Geo API')
        } else {
            callback(undefined, {
                location: body.results[0].providedLocation.location,
                latitude: body.results[0].locations[0].latLng.lat,
                longitude: body.results[0].locations[0].latLng.lng
            })
        }
    })
}

const fetchWeather = (lati, longi, callback) => {
    request({
        url: `https://api.darksky.net/forecast/805bd5a2cb32a32591c107b4ecbb3c2b/${lati},${longi}`,
        json: true
    }, (error, response, body) => {
        if(error) {
            callback('Failed to fetch weather API')
        } else {
            callback(undefined, body.currently)
        }
    })
}

module.exports = {
    geocodeAddress,
    fetchWeather
}