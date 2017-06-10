const prompt = require('prompt')
const WebSocketServer = require('uws').Server

const port = process.env.PORT || 28390

const wss = new WebSocketServer({ port })

prompt.message = 'FigPay'

console.log(`Server listening on ${port}`)
wss.on('connection', (ws) => {
  ws.on('message', onMessage)

  askCommand()

  function onMessage (message) {
    console.log(message)
  }

  function askCommand () {
    prompt.start()
    prompt.get(['value'], (err, result) => {
      if (err) console.error(err)

      console.log(result)

      ws.send(JSON.stringify({
        command: 'fig',
        value: result.value
      }))

      askCommand()
    })
  }
})

