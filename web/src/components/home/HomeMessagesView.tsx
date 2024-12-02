// src/components/home/HomeMessageView.tsx
import React from "react";
import { useHomeChatMessages } from "../../hook/useHomeMessages";
import { useNavigate } from "react-router-dom";

const HomeMessagesView: React.FC = () => {
  const {
    chats,
    userInfosMessages,
  } = useHomeChatMessages();
  

  return (
    <div className="home-page">
      <div className="home-container">
        <div className="home-page-header">
          <header>
            <p>Messages</p>
          </header>
        </div>
        <div id="chats-container">
          {chats.map((post) => (
            <div
              className="chats"
              key={post.postID}
              style={{ cursor: "pointer" }}
            >
              <header>
                {post.iconbase64 ? (
                  <img
                    src={`data:image/jpeg;base64,${post.iconbase64}`}
                    alt="Profile"
                    className="chats-icon"
                    style={{ cursor: "pointer" }}
                  />
                ) : (
                  <img
                    src="default-profile-icon.png"
                    alt="Profile"
                    className="chats-icon"
                    style={{ cursor: "pointer" }}
                  />
                )}
                <div className="chats-title">
                  <div
                    className="chats-name"
                    style={{ cursor: "pointer" }}
                  >
                    <p>{post.createdby}</p>
                  </div>
                </div>
              </header>
              <main>
                <div className="chats-content">
                  <p>{post.content}</p>
                </div>
              </main>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeMessagesView;
