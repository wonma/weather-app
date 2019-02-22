const yargs = require('yargs')

const geocode = require('./geocode/geocode')


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
    if(errorMessage) {
        console.log(errorMessage)
    } else {
        // console.log(JSON.stringify(result, undefined, 2))
        const location = result.location
        const lati = result.latitude
        const longi = reulst.longitude
    }
})

geocode.fetchWeather('35.097', '129.0081', (errorMessage, result) => {
    if(errorMessage) {
        console.log(errorMessage)
    } else {
        console.log(JSON.stringify(result, undefined, 2))
    }
}) 