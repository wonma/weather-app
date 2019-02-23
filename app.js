const yargs = require('yargs')

const geocode = require('./geocode/geocode')
const weather = require('./weather/weather')
const request = require('request')

const argv = yargs
        .options({
            a: {
                demand: true,
                alias: 'address',
                describe: 'Address to fetch geo api'
            }
        })
        .help()
        .alias('help', 'h')
        .argv

// Abstracting 시, 왜 yargs configuration한 것은 안 옮길까?
// 다른 곳 어디에 yargs가 쓰일 수 있는지 지금 예상을 못하고있다!!

geocode.geocodeAddress(argv.a, (errorMessage, result) => {
    console.log('Inside of callback')
    if(errorMessage) {
        console.log(errorMessage)
    } else {
        // console.log(JSON.stringify(result, undefined, 2))
        console.log('Location: ', result.location)
        weather.fetchWeather(result.latitude, result.longitude, (errorMessage, result) => {
            
            if (errorMessage) {
                console.log(errorMessage)
            } else {
                // console.log(JSON.stringify(result, undefined, 2))
                console.log('Temperature: ', result.temperature)
                console.log('Apparent Temperature: ', result.apparentTemperature)
            }
        }) 
    }
})



console.log('This is end of app.js')
