const path = require('path')
const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const { generateMessage, generateLocationMessage } = require('../utils/messages')
const {addUser, removeUser, getUser, getUsersInRoom} = require('../utils/users')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const publicDirectoryPath = path.join(__dirname, '../../public')

app.use(express.static(publicDirectoryPath))

io.on('connection', (socket) => {

    socket.on('join', (options, cb) => {
        const {user, error} = addUser({id: socket.id, ...options})

        if (error) {
            return cb(error)
        }

        socket.join(user.room)
        
        socket.emit('newMessage', generateMessage('Welcome to the chat', 'Admin'))
        socket.broadcast.to(user.room).emit('newMessage', generateMessage(`${user.username} has joined!`,'Admin'))

        io.to(user.room).emit('roomData', {
            room: user.room,
            usersInRoom: getUsersInRoom(user.room)
        })
        cb()
    })

    socket.on('clientMessage', (ms, cb) => {
        const user = getUser(socket.id)
        if (user) {
            io.to(user.room).emit('newMessage', generateMessage(ms, user.username))
            cb()
        }

    })

    socket.on('sendLocation', (location, cb) => {
        const user = getUser(socket.id)
        if (user) {
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(location, user.username))
            cb()
        }
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id)

        if (user) {
            io.to(user.room).emit('newMessage', generateMessage(`${user.username} has left!`, 'Admin'))
            io.to(user.room).emit('roomData', {
                room: user.room,
                usersInRoom: getUsersInRoom(user.room)
            })
        }
    })
})

module.exports = server