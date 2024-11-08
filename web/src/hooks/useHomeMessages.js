// src/hooks/useChatMessages.js
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export const useHomeChatMessages = () => {
  const [chats, setChats] = useState([]);
  const [content, setContent] = useState('');
  const [userInfosMessages, setuserInfosMessages] = useState({ name: '', iconBase64: '', username: '' });
  const token = localStorage.getItem('token');
  const cookie = document.cookie = `token=${token}; path=/; Secure; SameSite=Strict`;

  const loadChats = useCallback(async () => {
    try {
      const response = await axios.post(`http://localhost:8081/messages`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setChats(response.data.chats || []);
      
    } catch (error) {
      console.error('Failed to load messages:', error);
    }
  }, [token]);

  const setupWebSocket = useCallback(() => {
    if (!token) return;
    const wsURL = `ws://localhost:8081/websokcet/messages`;
    const ws = new WebSocket(wsURL);

    ws.onopen = () => console.log('WebSocket connection established.');

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setChats(data.chats || []);
      setuserInfosMessages(data.userInfos || { name: '', iconBase64: '' });

    };

    ws.onclose = () => {
      console.log('WebSocket connection closed. Reconnecting...');
      setTimeout(setupWebSocket, 1000);
      loadChats();
    };
  }, [loadChats]);

  useEffect(() => {
    loadChats();
    setupWebSocket();

  }, [loadChats, setupWebSocket]);


  return {
    chats,
    content,
    setContent,
    userInfosMessages
  };
};
