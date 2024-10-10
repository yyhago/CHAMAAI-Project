import React, { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import './Styles.css'

interface Message {
  text: string;
  senderId: string;
}

const Home: React.FC = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [socketId, setSocketId] = useState<string>('');
  const [onlineUsers, setOnlineUsers] = useState<number>(0);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket: Socket = io('http://localhost:5000');

    newSocket.on('connect', () => {
      if (newSocket.id) {
        setSocketId(newSocket.id);
        console.log('Conectado com ID:', newSocket.id);
      }
    });

    newSocket.on('userCount', (count: number) => {
      setOnlineUsers(count);
    });

    newSocket.on('receiveMessage', (message: Message) => {
      console.log('Mensagem recebida:', message);
      if (message && typeof message === 'object' && 'text' in message && 'senderId' in message) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleSendMessage = () => {
    if (message.trim() && socket) {
      const newMessage: Message = {
        text: message,
        senderId: socketId,
      };

      console.log('Enviando mensagem:', newMessage);
      socket.emit('sendMessage', newMessage);
      setMessage('');
    }
  };

  return (
    <div className="chat-wrapper">
      <div className="chat-container">
        <div className="chat-header">
          Chat em Tempo Real - Usuários Online: {onlineUsers}
        </div>
        <div className="chat-box">
          {messages.length === 0 ? (
            <div className="no-messages">Nenhuma mensagem ainda...</div>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`chat-message ${msg.senderId === socketId ? 'sent' : 'received'}`}
              >
                {typeof msg.text === 'string' ? msg.text : 'Mensagem inválida'}
              </div>
            ))
          )}
        </div>
        <div className="chat-input-container">
          <input
            className="chat-input"
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Digite sua mensagem"
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button className="send-button" onClick={handleSendMessage}>
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;