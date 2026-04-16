var express = require('express')
var app = express()

app.use(express.static('public'))

app.listen(5000, () => {
    console.log("App running on port 5000")
})
