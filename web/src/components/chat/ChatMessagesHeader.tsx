// src/components/chat/ChatMessagesHeader.tsx
import React from 'react';

interface ChatMessagesHeaderPropTypes  {
  userInfos: {
    name: string,
    iconBase64: string,
    username: string,
  }
};
const ChatMessagesHeader: React.FC<ChatMessagesHeaderPropTypes> = ({ userInfos }) => {
  return (
    <header>
      <div className="header-back">
        <img
          src="/images/arrow-back.png"
          alt="back"
          onClick={() => window.location.replace(`/chats`)}
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
          <p style={{ cursor: 'pointer' }}>{userInfos.name}</p>
        </div>
      </div>
    </header>
  );
};



export default ChatMessagesHeader;
