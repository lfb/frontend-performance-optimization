const http = require('http')

http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/plain',
        'Cache-Control': 'max-age=3600, s-maxage=36000, no-cache'
    })
    res.end('Hello Node.js')

}).listen(5000);
