import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import './Styles.css';

// Conectando ao servidor Socket.IO na porta 3002
const socket = io('http://localhost:3002', { withCredentials: true });

const ChatComponent: React.FC = () => {
  // Estado para armazenar as mensagens do chat
  const [messages, setMessages] = useState<{ text: string; sentByUser: boolean }[]>([]);
  // Estado para armazenar a mensagem de entrada do usuário
  const [inputMessage, setInputMessage] = useState<string>('');
  // Referência para o elemento da caixa de chat, usada para rolar automaticamente para baixo
  const chatBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Carregar mensagens do localStorage quando o componente montar
    const savedMessages = localStorage.getItem('chatMessages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }

    // Configura o evento para receber mensagens do servidor
    socket.on('message', (message: { text: string; sentByUser: boolean }) => {
      setMessages((prevMessages) => {
        const newMessages = [...prevMessages, { ...message, sentByUser: false }];
        // Salva as mensagens no localStorage para persistência
        localStorage.setItem('chatMessages', JSON.stringify(newMessages));
        return newMessages;
      });
    });

    // Limpa o evento quando o componente desmontar
    return () => {
      socket.off('message');
    };
  }, []);

  useEffect(() => {
    // Rola para o final do chat quando novas mensagens são adicionadas
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      // Cria a nova mensagem
      const message = { text: inputMessage, sentByUser: true };
      // Envia a mensagem para o servidor
      socket.emit('message', message);
      setMessages((prevMessages) => {
        const newMessages = [...prevMessages, message];
        // Atualiza o localStorage com a nova lista de mensagens
        localStorage.setItem('chatMessages', JSON.stringify(newMessages));
        return newMessages;
      });
      // Limpa o campo de entrada após enviar a mensagem
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
