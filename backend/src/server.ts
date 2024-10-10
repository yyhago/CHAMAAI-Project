import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import { errorHandler } from './utils/errorHandler';

interface Message {
  text: string;
  senderId: string;
}

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use('/users', userRoutes);
app.use(errorHandler);

const connectedUsers = new Set();

io.on('connection', (socket) => {
  console.log('Novo usuário conectado:', socket.id);
  
  connectedUsers.add(socket.id);
  io.emit('userCount', connectedUsers.size);

  socket.on('sendMessage', (message: Message) => {
    console.log('Mensagem recebida:', message); // Para debug
    const messageData: Message = {
      text: message.text,
      senderId: message.senderId
    };
    
    io.emit('receiveMessage', messageData);
  });

  socket.on('disconnect', () => {
    console.log('Usuário desconectado:', socket.id);
    connectedUsers.delete(socket.id);
    io.emit('userCount', connectedUsers.size);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});