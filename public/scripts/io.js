const socket = io() 

socket.on('newMessage', (message) => {
    console.log(message)
})

const plus = document.querySelector('#message-form').addEventListener('submit', (e) => {
    e.preventDefault()
    const ms = e.target.elements.message.value
    console.log('sending...');
    socket.emit('clientMessage', ms)
    e.target.elements.message.value = ''
})

document.querySelector('#location-form').addEventListener('submit', (e) => {
    e.preventDefault()
    
    if (!navigator.geolocation) {
        return console.log(`YOUR BROWSER DON'T SUPPORT GEOLOCATION`)
    }

    navigator.geolocation.getCurrentPosition((position) => {
        console.log('Sending location...')
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, () => {
            console.log('Location shared!')
        })
    })
})