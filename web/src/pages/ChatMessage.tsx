// src/pages/ChatMessages.tsx
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useChatMessages } from '../hook/useChatMessages';

import ChatMessagesViews from '../components/chat/ChatMessagesView';
import ChatMessageForm from '../components/chat/ChatMessagesForm';

const ChatMessages: React.FC = () => {
  const { username } = useParams<{ username: string }>(); 
  const { messages, content, setContent, userInfos, handleCreateMessage } = useChatMessages(username || '');
  const navigate = useNavigate();

  return (
    <div className="chat-page">
      <div className="chat-header">
        <header>
          <div className="header-back">
            <img
              src="/images/arrow-back.png"
              alt="back"
              onClick={() => navigate('/chats')}
              style={{ cursor: 'pointer' }}
            />
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
        {Array.isArray(messages) && messages.map((post) => (
          <ChatMessagesViews key={post.postid} post={post} />
        ))}
      </div>
      <ChatMessageForm
        content={content}
        setContent={setContent}
        handleCreateMessage={handleCreateMessage}
      />
    </div>
  );
};

export default ChatMessages;