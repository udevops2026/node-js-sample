var express = require('express')
var app = express()

app.set('port', process.env.PORT || 5000)
app.use(express.static(__dirname + '/public'))

app.get('/', function(req, res) {
  res.send(`
    <html>
    <head><title>Node.js CI/CD Demo</title></head>
    <body>
      <h1>🚀 Node.js CI/CD Demo Successful</h1>
      <h2>Deployed using Jenkins + PM2 + AWS EC2</h2>
      <p>Congratulations! Your pipeline is working.</p>
    </body>
    </html>
  `)
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
