const express = require('express')
const app = express()

const routes = require('./routes')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', routes)

app.listen(3000, () => {
  console.log('Hello World from port 3000')
})

module.exports = app