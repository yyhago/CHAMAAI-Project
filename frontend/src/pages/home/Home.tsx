import React, { useState } from 'react';
import './Styles.css';

const ChatComponent: React.FC = () => {
  const [messages, setMessages] = useState<{ text: string; sentByUser: boolean }[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setMessages([...messages, { text: inputMessage, sentByUser: true }]);
      setInputMessage('');
    }
  };

  return (
    <div className="chat-wrapper">
      <div className="chat-container">
        <div className="chat-header">
          <h2>Chama Aii! - Bate-Papo</h2>
        </div>
        <div className="chat-box">
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