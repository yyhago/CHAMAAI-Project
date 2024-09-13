import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import './Styles.css';

const socket = io('http://localhost:3002', { withCredentials: true });

const ChatComponent: React.FC = () => {
  const [messages, setMessages] = useState<{ text: string; sentByUser: boolean }[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const chatBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Carregar mensagens do localStorage quando o componente montar
    const savedMessages = localStorage.getItem('chatMessages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }

    // Recebe mensagens do servidor e atualiza o estado
    socket.on('message', (message: { text: string; sentByUser: boolean }) => {
      setMessages((prevMessages) => {
        const newMessages = [...prevMessages, { ...message, sentByUser: false }];
        localStorage.setItem('chatMessages', JSON.stringify(newMessages));
        return newMessages;
      });
    });

    return () => {
      socket.off('message');
    };
  }, []);

  useEffect(() => {
    // Rolar para o final do chat quando novas mensagens são adicionadas
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const message = { text: inputMessage, sentByUser: true };
      socket.emit('message', message);
      setMessages((prevMessages) => {
        const newMessages = [...prevMessages, message];
        localStorage.setItem('chatMessages', JSON.stringify(newMessages));
        return newMessages;
      });
      setInputMessage('');
    }
  };

  return (
    <div className="chat-wrapper">
      <div className="chat-container">
        <div className="chat-header">
          <h2>Chama Aii! - Bate-Papo</h2>
        </div>
        <div className="chat-box" ref={chatBoxRef}>
          {messages.length > 0 ? (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`chat-message ${msg.sentByUser ? 'sent' : 'received'}`}
              >
                {msg.text}
              </div>
            ))
          ) : (
            <div className="no-messages">Nenhuma mensagem ainda...</div>
          )}
        </div>
        <div className="chat-input-container">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Digite sua mensagem..."
            className="chat-input"
          />
          <button onClick={handleSendMessage} className="send-button">
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;