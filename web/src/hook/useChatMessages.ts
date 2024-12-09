// src/hook/useChatMessages.ts
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

interface Message {
  postid: string;
  content: string;
  messagesession?: boolean;
  hourminute: string;
}

interface UserInfos {
  name: string;
  iconBase64: string;
  username: string;
}

export const useChatMessages = (username: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [content, setContent] = useState<string>('');
  const [userInfos, setUserInfos] = useState<UserInfos>({ name: '', iconBase64: '', username: '' });
  const token = localStorage.getItem('token') || '';
  const cookie = document.cookie = `token=${token}; path=/; Secure; SameSite=Strict`;

  const loadMessages = useCallback(async () => {
    try {
      const response = await axios.post<{messages: Message[], userInfos: UserInfos }>(`http://localhost:8081/chat/${username}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessages(response.data.messages || []);
      setUserInfos(response.data.userInfos || { name: '', iconBase64: '', username: '' });

    } catch (error) {
      console.error('Failed to load messages:', error);
    }
  }, [username, token]);

  const setupWebSocket = useCallback(() => {
    if (!cookie) return;
    const wsURL = `ws://localhost:8081/websocket/chat/${username}`;
    const ws = new WebSocket(wsURL);

    ws.onopen = () => console.log('WebSocket connection established.');

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages(data.messages || []);
      setUserInfos(data.userInfos || { name: '', iconBase64: '', username: '' });
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed. Reconnecting...');
      setTimeout(setupWebSocket, 1000);
      loadMessages();
    };
  }, [username, loadMessages]);

  useEffect(() => {
    loadMessages();
    setupWebSocket();

  }, [loadMessages, setupWebSocket]);

  const handleCreateMessage = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await axios.post(`http://localhost:8081/create-message/${username}`, { content }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      setContent('');
      loadMessages();
    } catch (error) {
      console.error('Failed to create message:', error);
    }
  };

  return {
    messages,
    content,
    setContent,
    userInfos,
    handleCreateMessage,
  };
};
