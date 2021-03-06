let users = []

const addUser = ({id, username, room}) => {
    if (!username || !room) {
        return {error: 'Username and room are required'}
    }

    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()

    const existingUser = users.find((user) => {
        return user.room === room && user.username === username
    })

    if (existingUser) {
        return {error: `Username ${username} is alredy used in ${room}'s room`}
    }

    const user = {id, username, room}
    users.push(user)
    return { user }
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id)

    if (index !== -1) {
        return users.splice(index, 1)[0]
    }

    return {error: `No users found with id "${id}"`}
}

const getUser = (id) => users.find((usr) => usr.id === id)

const getUsersInRoom = (room) => {
    if (room) {
        room = room.trim().toLowerCase()
        return users.filter((user) => user.room === room)
    }
    return {error: 'A room is required'}
}

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}