const express = require('express')


const api =  require('./api')

// app port
const port = process.env.PORT || 1337

// app instance
const app = express()

// middlewares

// App routes
app.get('/entries', api.listEntries)

app.listen(port, () => console.log(`Server listening on port ${port}`))
