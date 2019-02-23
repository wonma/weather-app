const addNum = (a, b) => {
    return new Promise((resolve, reject) => {
        typeof a === 'number' && typeof b === 'number'
        ? setTimeout(() => {
            resolve(a + b)
          }, 2000)
        : reject('Adding failed')
    })
}

addNum(3, 4)
    .then((result1) => {
        console.log(result1)
        return addNum(5, result1)
    }).then((result2) => {
        console.log(result2)
    }).catch((err) => {
        console.log(err)
    })