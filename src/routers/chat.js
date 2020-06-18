const path = require('path')
const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const { generateMessage } = require('../utils/messages')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const publicDirectoryPath = path.join(__dirname, '../../public')

app.use(express.static(publicDirectoryPath))
console.log(generateMessage)
io.on('connection', (socket) => {
    socket.emit('newMessage', generateMessage('Welcome to the chat'))
    socket.broadcast.emit('newMessage', generateMessage('A new user has joined!'))

    socket.on('clientMessage', (ms, cb) => {
        io.emit('newMessage', generateMessage(ms))
        cb()
    })

    socket.on('sendLocation', (location, cb) => {
        io.emit('newLocationMessage', `https://google.com/maps?q=${location.latitude},${location.longitude}`)
        cb()
    })

    socket.on('disconnect', () => {
        io.emit('newMessage', generateMessage('An user has left!'))
    })
})

module.exports = server