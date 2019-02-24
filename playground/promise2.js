//---------------- 이 방법은 request를 Promise로 감싸야해서 불편함이 조금 있음 ----------
//---------------- 여전히 request가 callback을 사용하고 있기도 하고. -----------------

const request = require('request')

const geocodeAddress = (address) => {
    const encodedAddress = encodeURIComponent(address) // 샘은 이것을 Promise 안에 넣었음

    return new Promise((resolve, reject) => {
        request({
            url: `http://www.mapquestapi.com/geocoding/v1/address?key=rvZTAZLGjcGpRAQdnfoCfQhisYoOtTOb&location=${encodedAddress}`,
            json: true
        }, (error, response, body) => {
            if (error) {
                reject('Unable to fetch Geo API')
            } else if (body.info.statuscode > 0) {
                reject('Unable to fetch Geo API')
            } else {
                resolve({
                    location: body.results[0].providedLocation.location,
                    latitude: body.results[0].locations[0].latLng.lat,
                    longitude: body.results[0].locations[0].latLng.lng
                })
            }
        })
    })
}

const fetchWeather = (geoInfo) => {
    const { location, latitude, longitude } = geoInfo // 샘은 이것을 Promise 안에 넣었음
    
    return new Promise((resolve, reject) => {
        request({
            url: `https://api.darksky.net/forecast/805bd5a2cb32a32591c107b4ecbb3c2b/${latitude},${longitude}`,
            json: true
        }, (error, response, body) => {
            if (error || response.statusCode !== 200) { // 내가놓친 것: 두 종류의 에러를 묶어 버림
                reject('Failed to fetch weather API')
            } else {
                resolve({
                    location: location,
                    temperature: body.currently.temperature,
                    apparentTemperature: body.currently.apparentTemperature
                })
            }
        })
    })
}

geocodeAddress('Busan South Korea')
    .then((geoInfo) => {
        return fetchWeather(geoInfo)
    })
    .then((weatherInfo) => {
        console.log(weatherInfo)
    })
    .catch(err => console.log(err))