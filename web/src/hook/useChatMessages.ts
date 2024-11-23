
// src/hooks/useChatMessages.ts
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

interface UserInfo {
    name: string;
    iconBase64: string;
    username: string;
}

interface Message {
    id: string;
    postID: string;
    content: string;
    message: string;
    timestamp: string;
}

export const useChatMessages = (username: string) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [content, setContent] = useState('');
    const [autoScroll, setAutoScroll] = useState(true);
    const [userInfosMessages, setUserInfosMessages] = useState<UserInfo>({ name: '', iconBase64: '', username: '' });
    const token = localStorage.getItem('token');
    const cookie = document.cookie = `token=${token}; path=/; Secure; SameSite=Strict`;

    const loadMessages = useCallback(async () => {
        try {
            const response = await axios.post<{ messages: Message[] }>(`http://localhost:8080/chat/${username}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setMessages(response.data.messages || []);
        } catch (error) {
            console.error('Failed to load messages:', error);
        }
        if (autoScroll) {
            window.scrollTo(0, document.body.scrollHeight);
        }

    }, [username, token, autoScroll]);

    const setupWebSocket = useCallback(() => {
        if (!cookie) return;
        const wsURL = `ws://localhost:8080/websocket/${username}`;
        const ws = new WebSocket(wsURL);

    ws.onopen = () => console.log('WebSocket connection established.');

    document.cookie = `token=${token}; path=/; Secure; SameSite=Strict`;

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages(data.messages || []);
      setUserInfosMessages(data.userInfos || { name: '', iconBase64: '', username: '' });
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed. Reconnecting...');
      setTimeout(setupWebSocket, 1000);
      loadMessages();
    };
  }, [loadMessages, username, token]);

    useEffect(() => {
        loadMessages();
        setupWebSocket();

        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const scrollHeight = document.body.scrollHeight;
            const windowHeight = window.innerHeight;

            setAutoScroll(scrollTop + windowHeight >= scrollHeight - 5);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loadMessages, setupWebSocket]);

    const handleCreateMessage = async (e: React.FormEvent): Promise<void> =>  {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:8080/create-message/${username}`, { content }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
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
        userInfosMessages,
        handleCreateMessage
    };
};
