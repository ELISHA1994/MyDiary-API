import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
const cors = require('cors')
const bodyParser = require('body-parser')

import middleware from './middlewares/middlewares';
import api from './handlers/api'

const port = process.env.NODE_ENV === 'test' ? '1337' : process.env.PORT || '3000'

// app instance
const app = express()

// middlewares
app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));


// App routes
app.post('/api/v1/entries', api.createEntries);
app.get('/api/v1/entries', api.listEntries);
app.get('/api/v1/entries/:id', api.getEntries);
app.put('/api/v1/entries/:id', api.updateEntries);
app.delete('/api/v1/entries/:id', api.deleteEntries);

app.use(middleware.handleError)
app.use(middleware.notFound)

app.listen(port, () => console.log(`Server listening on port ${port}`))

export default app
