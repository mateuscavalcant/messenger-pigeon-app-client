// src/pages/ChatMessages.tsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useChatMessages } from "../hook/useChatMessages";
import ChatMessagesViews from "../components/chat/ChatMessagesView";
import ChatMessageForm from "../components/chat/ChatMessagesForm";
import "../styles/ChatMessages.css";

const ChatMessages: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const [selectedChat, setSelectedChat] = useState(username || "");
  const { messages, content, setContent, userInfos, handleCreateMessage } =
    useChatMessages(selectedChat);
  const navigate = useNavigate();

  useEffect(() => {
    if (username) {
      setSelectedChat(username); 
    }
  }, [username]);

  const handleChatSelect = (username: string) => {
    setSelectedChat(username);
    navigate(`/chats/${username}`); 
  };

  return (
    <div className="chat-page">
      <div className="chat-content">
        {selectedChat ? (
          <>
            <div className="chat-header">
        <header>
        <div className="header-back">
              <img
              src="/images/arrow-back.png"
              alt='back'
                onClick={() => window.location.replace(`/chats`)}
                style={{ cursor: 'pointer' }}
              >
                
              </img>
            </div>
          <div className="header-home-screen">
            {userInfos.iconBase64 && (
              <img
                src={`data:image/jpeg;base64,${userInfos.iconBase64}`}
                className="profile-icon"
                alt="profile"
                style={{ cursor: 'pointer' }}
              />
            )}
            <div className="header-name">
              <p
                style={{ cursor: 'pointer' }}
              >
                {userInfos.name}
              </p>
            </div>
          </div>
        </header>
      </div>
            <div className="messages-container" id="messages-container">
              {messages.map((post) => (
                <ChatMessagesViews key={post.postid} post={post} />
              ))}
            </div>
            <ChatMessageForm
              content={content}
              setContent={setContent}
              handleCreateMessage={handleCreateMessage}
            />
          </>
        ) : (
          <div className="no-chat-selected">
            <p>Selecione um chat para visualizar as mensagens.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessages;
