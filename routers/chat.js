const path = require('path')
const express = require('express')
const http = require('http')

const app = express()
const server = http.createServer(app)

const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

module.exports = server