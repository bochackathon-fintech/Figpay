const http = require('http')

const express = require('express')
const bodyParser = require('body-parser')
const WebSocket = require('uws')

const serverPort = process.env.SERVER_PORT || 18881

const app = express()
const server = http.createServer(app)
const wss = new WebSocket.Server({ server })

app.use(bodyParser.json())

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

app.use(express.static('public'))

app.get('/api', (req, res) => res.send({
  message: 'Fig Pay POS'
}))

app.post('/api/pay', (req, res) => {
  console.log('Pay request', req.body)

  if (!req.body.amount) return res.sendStatus(400)

  wss.broadcast(JSON.stringify({
    command: 'fig',
    value: req.body.amount
  }))

  res.sendStatus(200)
})

wss.on('connection', (ws) => {
  console.log('Client connected')

  ws.on('message', (message) => {
    console.log(message)
  })

  ws.send(JSON.stringify({
    command: 'welcome'
  }))
})

server.listen(serverPort, () => {
  console.log(`Server listening on ${serverPort}`)

  wss.broadcast = function broadcast (data) {
    wss.clients.forEach(function each (client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data)
      }
    })
  }
})

