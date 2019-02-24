const yargs = require('yargs')
const axios = require('axios')

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch geo api',
            default: 'Seoul Korea'
        }
    })
    .help()
    .alias('help', 'h')
    .argv


const address = encodeURIComponent(argv.a)
const url = `http://www.mapquestapi.com/geocoding/v1/address?key=rvZTAZLGjcGpRAQdnfoCfQhisYoOtTOb&location=${address}`

axios.get(url)
    .then((response)=>{
        // coonst location = body.results[0].providedLocation.location,
        const lat = response.data.results[0].locations[0].latLng.lat
        const lng = response.data.results[0].locations[0].latLng.lng
        console.log(response.data.results[0].providedLocation.location)
        return axios.get(`https://api.darksky.net/forecast/805bd5a2cb32a32591c107b4ecbb3c2b/${lat},${lng}`)
    })
    .then((response) => { // 서버 400대 오류나면 response === null. 콘솔아웃할수없음
        console.log(response.data.currently.temperature)
        console.log(response.data.hourly.summary)
        console.log(response.data.daily.summary)
    })
    .catch((error) => {
        if (error.code === 'ENOTFOUND') {
            console.log('Unable to connect to API servers.')
        } else {
            console.log(error.message)
            // if (error.response.data.error.includes('location')) {  // 어느 서버 에러인지 구분 할 필요가 있을 때만 이렇게 하기
            //     console.log('This is weather server error')       
            // }
        }
        // error.response는 200이든 400이든 response받은 후 error 종류 받은 상태라는 뜻
        // error.response.status 이걸로 200인지 400인지 알 수 있음 (단, 어느 서버 때문인지는 알 수 없음)
    })
