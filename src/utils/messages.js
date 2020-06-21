const generateMessage = (str,username) => {
    return {
        text: str,
        createdAt: new Date().getTime(),
        username
    }
}

const generateLocationMessage = (location,username) => {
    return {
        url: `https://google.com/maps?q=${location.latitude},${location.longitude}`,
        createdAt: new Date().getTime(),
        username
    }
}

module.exports = {generateMessage, generateLocationMessage}