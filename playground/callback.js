// const getUser = (id, callback) => {
    
//     // 이 코드 블럭이 fetch하는 부분이라 가정해보자.
//     // 이름은 hardcoded되었지만 id에 따라 이름도 찾겨진다고 가정.
//     const user = {
//         id: id,
//         name:'Wonmi'
//     }
//     //------------------------------------

//     setTimeout(() => {
//         callback(user)
//     }, 2000)
// }

// getUser(105, (user) => {
//     console.log('Hello! ',user.name)
// })


// addEventListener도 define 될 때이런식으로 되어있겠지.
// 어느 시점에 callback function이 execute될 지 정해져있고
// 그 callback function에
// 해당 이벤트 관련 정보를 모은 오브젝트를 argument로 넘겨주도록.

console.log('Start of main() function')

const fetchingData = (id, callback) => {
    console.log('fetchingData start')
    let user;
    if (id === 123) {
        user = {
            name: 'WonmiKwon',
            age: 30
        }
    }
    setTimeout(() => {
        callback(user.name)
    }, 2000);
    console.log('fetchingData End')
}

fetchingData(123, (fromInput) => {
    console.log('lalala', fromInput)
})

console.log('End of main() function')