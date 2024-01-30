import React, { useState, useEffect } from 'react';

const ChatMessages: React.FC = () => {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [authorName, setAuthorName] = useState('Tim Ledger');

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
      setMessages(data.reverse());
    } catch (error) {
      console.error('Ошибка при получении сообщений:', error);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const url = 'http://146.185.154.90:8000/messages';
      const data = new URLSearchParams();
      data.set('message', messageText);
      data.set('author', authorName);

      const response = await fetch(url, {
        method: 'POST',
        body: data
      });

      if (!response.ok) {
        throw new Error('Не удалось отправить сообщение');
      }

      console.log('Сообщение успешно отправлено');
      setMessageText('');
      fetchMessages(); 
    } catch (error) {
      console.error('Ошибка отправки сообщения:', error);
    }
  };

  return (
    <div>
      <h2>Чат</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="Введите сообщение..."
          required
        />
        <input
          type="text"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          placeholder="Ваше имя..."
          required
        />
        <button type="submit">Отправить</button>
      </form>
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
