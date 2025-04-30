import http from 'http'

http.createServer((req, res) => {
  switch(req.url) {
    case '/':
      // 前端页面
      return write_webpage(res)
    case '/abc':
      // 接口
      return write_event_stream(res)
    default:
      res.writeHead(200, {
        'content-type': 'text/plain',
      })
      return res.end('不重要的请求')
  }
}).listen(8866, () => {
  console.log('Server is running at http://localhost:8866')
})

function write_event_stream(res) {
  res.writeHead(200, {
    'content-type': 'text/event-stream', // !!! 关键就是这里
  })
  let index = 0
  const time_id = setInterval(() => {
    if (index > 10) {
      clearInterval(time_id)
      res.end('over\n')
      return
    } else {
      res.write(index + ' some string\n')
      index++
    }
  }, 1000)
}

function write_webpage(res) {
  res.end(`
    <script>
      fetch('/abc').then(response => {
        const reader = response.body.getReader()
        const decoder = new TextDecoder('utf-8')
        read() // 递归

        function read() {
          reader.read().then(({ done, value }) => {
            if (done) {
              console.log('Stream finished')
              return
            }
            const text = decoder.decode(value, { stream: true })
            console.log(text)
            read()
          })
        }
      })
    </script>
  `)
}
