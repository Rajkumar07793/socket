// const app = require("express")();
const server = require("http").createServer();
// const port = process.env || 3000;
const port = 3000;

server.listen(port, "0.0.0.0", () => {
    console.log("Server is Started on", port);
})
// console.log(server);
const io = require('socket.io')(server);
const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";

// console.log(io.log);

io.on('connection', (socket) => {
    console.log("Connected successfully", socket.id);

    socket.on('disconnect', () => {
        console.log(`Client ${socket.id} diconnected`);
        socket.leave(roomId);
        console.log('roomId', roomId);
    })

    socket.on('joinRoom', (data) => {
        console.log('room connect', data);
        roomId = data.roomId;
        socket.join(data.roomId);
        console.log('room id', roomId);
    });

    socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
        console.log('message data', data);
        io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
    });
})