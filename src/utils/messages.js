const generateMessage = (str) => {
    return {
        text: str,
        createdAt: new Date().getTime()
    }
}

module.exports = {generateMessage}