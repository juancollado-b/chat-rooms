const path = require('path')
const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const { generateMessage, generateLocationMessage } = require('../utils/messages')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const publicDirectoryPath = path.join(__dirname, '../../public')

app.use(express.static(publicDirectoryPath))

io.on('connection', (socket) => {

    socket.on('join', ({username, room}) => {
        socket.join(room)
        
        socket.emit('newMessage', generateMessage('Welcome to the chat'))
        socket.broadcast.to(room).emit('newMessage', generateMessage(`${username} has joined!`))
    })

    socket.on('clientMessage', (ms, cb) => {
        io.emit('newMessage', generateMessage(ms))
        cb()
    })

    socket.on('sendLocation', (location, cb) => {
        io.emit('newLocationMessage', generateLocationMessage(location))
        cb()
    })

    socket.on('disconnect', () => {
        io.emit('newMessage', generateMessage('An user has left!'))
    })
})

module.exports = server