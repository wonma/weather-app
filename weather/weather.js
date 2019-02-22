const request = require('request')


const fetchWeather = (lati, longi, callback) => {
    request({
        url: `https://api.darksky.net/forecast/805bd5a2cb32a32591c107b4ecbb3c2b/${lati},${longi}`,
        json: true
    }, (error, response, body) => {
        if (error || response.statusCode !== 200) { // 내가놓친 것: 두 종류의 에러를 묶어 버림
            callback('Failed to fetch weather API')
        } else {
            callback(undefined, {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            })
        }
    })
}

module.exports.fetchWeather = fetchWeather