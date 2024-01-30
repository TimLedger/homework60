import React, { useState, useEffect } from 'react';
import { TextField, Button, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';

interface Message {
    _id: string;
    message: string;
    author: string;
    datetime: string;
}

const ChatMessages: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
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
      const response = await axios.get<Message[]>('http://146.185.154.90:8000/messages');
      if (!response.data) {
        throw new Error('Не удалось получить сообщения.');
      }
      setMessages(response.data.reverse());
    } catch (error) {
      console.error('Ошибка при получении сообщений:', error);
    }
  };

  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const url = 'http://146.185.154.90:8000/messages';
      const data = new URLSearchParams();
      data.set('message', messageText);
      data.set('author', authorName);

      const response = await axios.post<Message>(url, data);

      if (!response.data) {
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
      <form onSubmit={handleSubmit}>
      <TextField
        className='input-message'
        label="Ваше сообщение"
        variant="outlined"
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        required
      />
      <TextField
        label="Ваше имя"
        variant="outlined"
        value={authorName}
        onChange={(e) => setAuthorName(e.target.value)}
        required
      />
      <Button type="submit" variant="contained" color="primary" endIcon={<SendIcon />}>
        Отправить
      </Button>
      </form>
      <List className='list'>
      {messages.map((message) => (
          <ListItem key={message._id} className='message'>
            <ListItemAvatar>
              <Avatar>{message.author[0]}</Avatar>
            </ListItemAvatar>
            <ListItemText 
              primary={message.author}
              secondary={ 
                <>
                  <span className='message-text'>{message.message}</span>
                  <br/>
                  <span className="time">{formatDateTime(message.datetime)}</span>
                </>
              }
            />
          </ListItem>
        ))}
       </List>
  </div>
  );
};

export default ChatMessages;
