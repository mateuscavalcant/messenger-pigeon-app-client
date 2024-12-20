// src/components/chat/ChatMessageForm.tsx
import React from 'react';

const ChatMessageForm = ({ content, setContent, handleCreateMessage }) => {
  return (
    <form className="message-form-create" onSubmit={handleCreateMessage}>
      <input
        type="text"
        placeholder="What's happening?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default ChatMessageForm;