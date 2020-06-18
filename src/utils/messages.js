const generateMessage = (str) => {
    return {
        text: str,
        createdAt: new Date().getTime()
    }
}

const generateLocationMessage = (location) => {
    return {
        url: `https://google.com/maps?q=${location.latitude},${location.longitude}`,
        createdAt: new Date().getTime()
    }
}

module.exports = {generateMessage, generateLocationMessage}