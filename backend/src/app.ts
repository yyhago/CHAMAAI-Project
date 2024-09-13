import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const server = http.createServer(app);

app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true
  }
});

let connectedClients: Set<string> = new Set();

io.on('connection', (socket) => {
  console.log('A user connected');
  connectedClients.add(socket.id);

  socket.on('message', (message) => {
    socket.broadcast.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
    connectedClients.delete(socket.id);

    if (connectedClients.size === 0) {
      io.emit('clearChat');
    }
  });
});

const PORT = 3002;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
