const path = require('path')
const express = require('express')
const http = require('http')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

io.on('connection', (socket) => {
    socket.emit('newMessage', 'Welcome to the chat')
    socket.broadcast.emit('newMessage', 'A new user has joined!')

    socket.on('clientMessage', (ms) => {
        io.emit('newMessage', ms)
    })

    socket.on('sendLocation', (location) => {
        socket.broadcast.emit('newMessage', `https://google.com/maps?q=${location.latitude},${location.longitude}`)
    })

    socket.on('disconnect', () => {
        io.emit('newMessage', 'An user has left!')
    })
})

module.exports = server