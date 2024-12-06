// src/components/chat/ChatMessagesView.tsx
import React from 'react';

interface MessageProps {
  post: {
    postid: string;
    content: string;
    messagesession?: boolean;
    hourminute: string;
  };
}

const ChatMessagesViews: React.FC<MessageProps> = ({ post }) => {
  return (
    <div className={post.messagesession ? 'message-session' : 'message-to'}>
      <header>
        <div className="message-box">
          <div className="post-content">
            <p>{post.content}</p>
          </div>
        </div>
      </header>
      <div className="user-name-message">
        <p>{post.hourminute}</p>
      </div>
    </div>
  );
};

export default ChatMessagesViews;