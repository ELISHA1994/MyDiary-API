const express = require('express')
const cors = require('cors')
const middleware = require('./middlewares')

const api =  require('./api')

// app port
const port = process.env.PORT || 1337

// app instance
const app = express()

// middlewares
app.use(cors())

// App routes
app.get('/entries', api.listEntries)
app.get('/entries/:id', api.getEntries)

app.use(middleware.handleError)
app.use(middleware.notFound)
app.listen(port, () => console.log(`Server listening on port ${port}`))
