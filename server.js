const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()

const config = require('./app/config/config')
const PORT = config.APP_PORT || 4000

app.use(express.static(path.join(__dirname, '/public')))

const routes = require('./app/routes')

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')

    next()
})

// configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', routes);

// Server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}.`);
});