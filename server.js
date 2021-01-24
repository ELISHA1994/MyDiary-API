const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const api =  require('./api')
const middleware = require('./middlewares')

// app port
const port = process.env.PORT || 1337

// app instance
const app = express()

// middlewares
app.use(cors())
app.use(bodyParser.json())

// App routes
app.post('/entries', api.createEntries)
app.get('/entries', api.listEntries)
app.get('/entries/:id', api.getEntries)
app.put('/entries/:id', api.updateEntries)
app.delete('/entries/:id', api.deleteEntries)

app.use(middleware.handleError)
app.use(middleware.notFound)

app.listen(port, () => console.log(`Server listening on port ${port}`))
module.exports.app = app
