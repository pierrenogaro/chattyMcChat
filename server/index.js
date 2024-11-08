const http = require('http');
const socketIo = require ('socket.io')

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('serveur socket.io en marche');
})

const io = socketIo(server, {

    transports: ['websocket', 'polling'],
    cors: {
        origin: "*", // https://chatclient.pierrenogaro.com
        methods: ['GET', 'POST'],
    }
});


io.on ('connection', (socket) => {
    console.log('New user connected');
    console.log('user-socket ID :' + socket.user.id);

    socket.on('message', (message) => {
        console.log('Received message : '+ socket.id)
        console.log(message.content);

        try{
            io.emit('message', {
                author : socket.id,
                content : message.content,
            });
        }catch (e) {
            console.log(e);
        }finally {
            console.log('Brodcasted message all clients');
            console.log(io.sockets.size);
        }

    })
})

server.listen(8080, ()=>{
    console.log('Server listening on port 8080');
});