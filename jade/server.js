var http = require('http')
var jade = require('jade')

http.createServer((req,res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');

    // 1. jade.compile
    // var fn = jade.compile('div #{couse}', {})
    // var html = fn({couse: 'jade'})

    // 2. jade.render
    // var html = jade.render('div #{course}', {course: 'jade render'})

    // 3. jade.renderFile
    var html = jade.renderFile('index.jade', {
        coures: 'jade renderFile',
        pretty: true    // 代码格式化
    })


    res.end(html)
}).listen(1337, '127.0.0.1')

console.log('Server running at 1337')