const socket = io() 

// Elements
//const $messageForm = document.querySelector('#message-form')
const $messageFormInput = document.querySelector('#message-input')
const $messageFormButton = document.querySelector('#message-button')
const $locationFormButton = document.querySelector('#location-button')
const $messages = document.querySelector('#messages')

//Templates
const messageTemplate = document.querySelector('#message-template').innerHTML
const locationTemplate = document.querySelector('#location-template').innerHTML

//Options

const { username, room } = Qs.parse(location.search, {ignoreQueryPrefix: true})

socket.on('newMessage', (message) => {
    const html = Mustache.render(messageTemplate, {
        message: message.text,
        createdAt: moment(message.createdAt).format('h:mm a'),
        username: message.username
    })
    $messages.insertAdjacentHTML('beforeend', html)
})

socket.on('newLocationMessage', (locationMessage) => {
    const html = Mustache.render(locationTemplate, {
        url: locationMessage.url,
        createdAt: moment(locationMessage.createdAt).format('h:mm a'),
        username: locationMessage.username
    })

    $messages.insertAdjacentHTML('beforeend', html)
})

const plus = document.querySelector('#message-form').addEventListener('submit', (e) => {
    e.preventDefault()

    $messageFormButton.setAttribute('disabled', 'disabled') 
    const ms = $messageFormInput.value


    console.log('sending...');
    socket.emit('clientMessage', ms, () => {
        $messageFormInput.value = ''
        $messageFormButton.removeAttribute('disabled')
        $messageFormInput.focus()
    })
})

document.querySelector('#location-form').addEventListener('submit', (e) => {
    e.preventDefault()
    
    if (!navigator.geolocation) {
        return console.log(`YOUR BROWSER DON'T SUPPORT GEOLOCATION`)
    }

    $locationFormButton.setAttribute('disabled', 'disabled')

    navigator.geolocation.getCurrentPosition((position) => {
        console.log('Sending location...')
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, () => {
            $locationFormButton.removeAttribute('disabled')
            console.log('Location shared!')
        })
    })
})

socket.emit('join', {username, room}, (error) => {
    if (error) {
        alert(error)
    }
})