const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app  = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
});


const path = require('path');

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});




io.on('connection', (socket) => {
    io.emit('sessionCount', io.engine.clientsCount);
    socket.on('disconnect', () => {
        io.emit('sessionCount', io.engine.clientsCount)
    });
});


const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
    console.log(`server launched on http://localhost:${PORT}`);
});