const WebSocket = require("ws")

// 创建一个Server类
const WebSocketServer = WebSocket.Server

// 实例化
const wss = new WebSocketServer({
  port: 3000
})

// 异步过程
wss.on("connection", function(ws) {
  console.log(`[SERVER] Connected!`)
  // 在connection事件中，回调函数会传入一个WebSocket的实例，表示这个WebSocket连接
  //  对于每个WebSocket连接，我们都要对它绑定某些事件方法来处理不同的事件
  // 这里，我们通过响应message事件，在收到消息后再返回一个ECHO: xxx的消息给客户端。
  ws.on("message", function(message) {
    console.log(`[SERVER] Received: ${message}`)
    // 每过3秒 服务器向客户端发送信息
    setTimeout(() => {
      ws.send(`What's your name?`, err => {
        if (err) {
          console.log(`[SERVER]: ${err}`)
          wss.close()
        }
      })
    }, 3000)
  })
})

console.log("websocket server started at port 3000...")

// client test:
// WebSocket协议本身不要求同源策略（Same-origin Policy）
let count = 0
// 在客户端打开ws://localhost:3000/any/path可以写任意的路径。
// 实际应用中还需要根据不同的路径实现不同的功能。
const ws = new WebSocket("ws://localhost:3000/")

ws.on("open", function() {
  console.log(`[CLIENT] Opend!`)
  ws.send("Hello!")
})

// 处理5次回应
ws.on("message", function(message) {
  console.log(`[CLIENT] Received: ${message}`)
  count++
  //  客户端1秒后回复
  setTimeout(() => {
    if (count > 5) {
      ws.send("Bye~")
      ws.close()
    } else {
      ws.send(`Hello, I'm the man of NO.${count}!`)
    }
  }, 1000)
})
