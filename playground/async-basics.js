console.log('Starting app')

setTimeout(() => {
    console.log('Inside of callback')
}, 2000)

setTimeout(() => {
    console.log('0 sec of set Timeout')
}, 0)

console.log('Finishing up')