const http = require("http")
const fs = require('fs')

const LAST_MODIFIED_TIME = 'Tue, 20 Aug 2019 06:32:48 GMT'
const ETAG_NAME = " W/\'2a3b-1602480f459\'"

http.createServer((req, res) => {
    if(req.url === '/'){
        const html = fs.readFileSync('./index.html', 'utf8')
        res.writeHead(200, {
            'Content-Type': 'text/html'
        })
        res.end(html)
    }

    if(req.url === '/test.js'){
        // 获取 if-none-match 和 if-modified-since
        const IF_MODIFIED_SINCE = req.headers["if-modified-since"];
        const IF_NONE_MATCH = req.headers["if-none-match"];

        // 判断头信息是否一致
        if(IF_MODIFIED_SINCE === LAST_MODIFIED_TIME || IF_NONE_MATCH === ETAG_NAME){
            res.writeHead(304, {
                'Content-Type': 'text/html',
                'Cache-Control': 'max-age=36000, no-cache',
                'Last-Modified': LAST_MODIFIED_TIME,
                'Etag': ETAG_NAME
            })
            res.end('')
        }else {
            res.writeHead(200, {
                'Content-Type': 'text/html',
                'Cache-Control': 'max-age=36000, no-cache',
                'Last-Modified': LAST_MODIFIED_TIME,
                'Etag': ETAG_NAME
            })
            res.end(`console.log('Hello, Node.js')`)
        }
    }
}).listen(5000)
