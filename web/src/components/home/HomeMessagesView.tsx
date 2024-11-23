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
              className="post"
              key={post.postID}
              style={{ cursor: "pointer" }}
            >
              <header>
                {post.iconbase64 ? (
                  <img
                    src={`data:image/jpeg;base64,${post.iconbase64}`}
                    alt="Profile"
                    className="profile-icon"
                    style={{ cursor: "pointer" }}
                  />
                ) : (
                  <img
                    src="default-profile-icon.png"
                    alt="Profile"
                    className="profile-icon"
                    style={{ cursor: "pointer" }}
                  />
                )}
                <div className="post-title">
                  <div
                    className="user-name"
                    style={{ cursor: "pointer" }}
                  >
                    <p>{post.createdby}</p>
                  </div>
                </div>
              </header>
              <main>
                <div className="post-content">
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
