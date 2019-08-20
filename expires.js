const http = require('http')

http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/plain',
        'Expires': 'Tue, 20 Aug 2019 10:30:49 GMT'
    })
    res.end('Hello Node.js')

}).listen(5000)

