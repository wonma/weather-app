const request = require('request')

const geocodeAddress = (userAddress, callback) => {
    console.log('Start of geocode fetching')
    const address = encodeURIComponent(userAddress)

    request({
        url: `http://www.mapquestapi.com/geocoding/v1/address?key=rvZTAZLGjcGpRAQdnfoCfQhisYoOtTOb&location=${address}`,
        json: true
    }, (error, response, body) => {
        // console.log(error) // 에러 없으면 값이 null
        // console.log(JSON.stringify(body, undefined, 2)) // Pretty Pringting for Node

        // 잘 보면 어쨌든 콜백은 한 번 발생하는 것임. 무슨 데이터를 떠넘기냐가 다르지.
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

module.exports.geocodeAddress = geocodeAddress