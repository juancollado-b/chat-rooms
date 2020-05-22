const app = require('../routers/chat')

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server is up on  htpp://localhost:${port}`)
})