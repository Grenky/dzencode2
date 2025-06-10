const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app  = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
});


io.on('connection', (socket) => {
    io.emit('sessionCount', io.engine.clientsCount);

    socket.on('disconnect', () => {
        io.emit('sessionCount', io.engine.clientsCount)
    });
});


const PORT = 3001;

server.listen(PORT, () => {
    console.log(`server launched on http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
  res.send('server works!');
});

app.use((req, res) => {
  res.status(404).send('Сторінку не знайдено');
});