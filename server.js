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
app.use('/vendor', express.static('./node_modules'))

// Launch server
app.listen(3000, () => {
    console.log('Dashboard process listening on port ' + 3000 + '!')
})
