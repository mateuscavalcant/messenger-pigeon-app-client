import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';


// Tipagem para os dados das mensagens e do usuário
interface UserInfo {
  name: string;
  iconBase64: string;
  username: string;
}

interface Chat {
  id: string;
  postID: string;
  createdby: string;
  content: string;
  iconbase64: string;
  message: string;
  timestamp: string;
}

export const useHomeChatMessages = () => {
  const [chats, setChats] = useState<Chat[]>([]); // Definindo tipo de estado como array de Chat
  const [content, setContent] = useState<string>(''); 
  const [userInfosMessages, setUserInfosMessages] = useState<UserInfo>({ name: '', iconBase64: '', username: '' }); // Tipagem para o estado do usuário
  const token = localStorage.getItem('token');

  // Função para carregar os chats
  const loadChats = useCallback(async () => {
    try {
      const response = await axios.post<{ chats: Chat[] }>(`http://localhost:8080/chats`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setChats(response.data.chats || []);
    } catch (error) {
      console.error('Failed to load messages:', error);
    }
    
  }, [token]);

  // Função para configurar o WebSocket
  const setupWebSocket = useCallback(() => {
    if (!token) return;
    const wsURL = `ws://localhost:8080/websocket/chats`;
    const ws = new WebSocket(wsURL);

    ws.onopen = () => console.log('WebSocket connection established.');

    document.cookie = `token=${token}; path=/; Secure; SameSite=Strict`;

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setChats(data.chats || []);
      setUserInfosMessages(data.userInfos || { name: '', iconBase64: '', username: '' });
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed. Reconnecting...');
      setTimeout(setupWebSocket, 1000);
      loadChats();
    };
  }, [loadChats, token]);

  // useEffect para carregar os chats e configurar o WebSocket
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
