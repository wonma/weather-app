const bakingMacaroon = (flavor) => {

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const response = `${flavor} macaroon has been freshly baked!`
            resolve(response)
            reject('Baking failed')
        }, 2000)
    })  // This promise object will get to contain the results 
        // ,which is when it's ready to extracted.
}

// Using '.then' to extract the results out of the promise
bakingMacaroon('blue berry')
    .then((successMessage) => {
        console.log('Say: ' + successMessage)
    }, (error) => {
        console.log(error)
    })
    