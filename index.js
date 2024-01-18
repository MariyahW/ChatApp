const express = require(`express`);
const socket = require(`socket.io`);
const http = require('http');
const path = require('path');
const { disconnect } = require('process');

const app = express();
const server = http.createServer(app);
const io= socket(server);


app.use(express.static('public'))

let userCount=0;

io.on('connection', (socket)=>{
    userCount++;
    socket.userName= `User ${userCount}`;
io.emit('chat-message', {user:'system', message:`${socket.userName} has joined`});

//Listen for 
socket.on('chat message',(msg)=>{
    io.emit({user: socket.userName, message:msg});
});
//check for typing
socket.on('typing', ()=>{
    socket.broadcast.emit('typing', socket.userName)
});

//check to stop typing
socket.on('stop typing', ()=>{
    socket.broadcast.emit('stop typing')
});

//disconnects from chat
socket.on('disconnect',()=>{
    io.emit('chat message', {user:'system', message:`${socket.userName} has left the chat`});
});
});

// app.get('/', (req, res)=>{
//     res.send("Hello World");
// })


server.listen(3000);