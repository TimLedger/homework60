import React, { useState, useEffect } from 'react';

const ChatMessages: React.FC = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchMessages();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch('http://146.185.154.90:8000/messages');
      if (!response.ok) {
        throw new Error('Не удалось получить сообщения.');
      }
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error('Ошибка при получении сообщений:', error);
    }
  };

  

  return (
    <div>
      <h2>Чат</h2>
      <ul>
        {messages.map((message: any) => (
          <li key={message._id}>
            <strong>{message.author}:</strong> {message.message} ({message.datetime})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatMessages;
