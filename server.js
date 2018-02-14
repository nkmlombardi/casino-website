var express = require('express')
var morgan = require('morgan')
var app = express()

// Logging
app.use(morgan('short'))

// Cross Origin Requests
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS")
    next()
})

// Static assets
app.use(express.static('./'))

// Launch server
app.listen(process.env.PORT, () => {
    console.log('Dashboard process listening on port ' + process.env.PORT + '!')
})
