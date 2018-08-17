var https = require('https')
var fs = require('fs')

var  options = {
    key: fs.readFileSync('ssh_key.pem'),
    cert: fs.readdirSync('ssh_cert.pem')
}

https.createServer(options, (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World\n');
}).listen(8090)