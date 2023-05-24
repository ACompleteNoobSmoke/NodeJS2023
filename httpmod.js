const http = require('http');
const portNumber = 3005;

const server = http.createServer((req, res) => {
    if(req.url === '/')  res.write('Hello There Uyi');
    else if (req.url === '/occupation') res.write("You Are A Senior Developer");
    res.end();
});

server.on('connection', (socket) => {
    console.log('Connected For Free\n');
})
server.listen(portNumber);

console.log(`Listening on Port:${portNumber}!`)