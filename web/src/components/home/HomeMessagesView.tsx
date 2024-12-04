// src/components/home/HomeMessageView.tsx
import React from "react";
import { useHomeChatMessages } from "../../hook/useHomeMessages";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HomeMessagesView: React.FC = () => {
  const { token, chats } = useHomeChatMessages();
  const navigate = useNavigate();

  const handleMessage = (username: string) => {
    axios
      .post(
        `http://localhost:8080/chat/${username}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => navigate(`/chats/${username}`))
      .catch((error) => {
        console.error(
          "Failed to start chat:",
          error.response ? error.response.data : error.message
        );
      });
  };

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
              onClick={() => handleMessage(post.createdby)}
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
                  <div className="chats-name" style={{ cursor: "pointer" }}>
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
