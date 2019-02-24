const request = require('request')


const fetchWeather = (lati, longi, callback) => {
    request({
        url: `https://api.darksky.net/forecast/805bd5a2cb32a32591c107b4ecbbc2b/${lati},${longi}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('Failed to Connect to weater API Server')
        } else if (response.statusCode !== 200) {
            callback('Connected to Server but failed to fetch')
        } else {
            callback(undefined, {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            })
        }
    })
}

// https://api.darksky.net/forecast/805bd5a2cb32a32591c107b4ecbb3c2b/35.099998,129.050003

module.exports.fetchWeather = fetchWeather