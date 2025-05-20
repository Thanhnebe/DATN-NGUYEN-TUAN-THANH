import React, { useCallback, useEffect, useState } from "react";
import { db } from "../firebase";
import callApi from "../utils/apiCaller";

function ChatPage() {
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      const token = localStorage.getItem("_auth");
      if (token) {
        const res = await callApi(
          `users?filter={"role.nameRole": "user"}`,
          "GET",
          null,
          token
        );
        if (res?.status === 200) {
          setUsers(res.data.results);
        }
      }
    };

    getUser();
  }, []);

  // Lấy tất cả cuộc trò chuyện của admin
  useEffect(() => {
    const conversationsRef = db.ref("conversations");
    conversationsRef.on("value", (snapshot) => {
      const data = snapshot.val();
      let conversationArray = data ? Object.keys(data) : [];

      // Duyệt qua từng cuộc trò chuyện để kiểm tra có tin nhắn mới hay không
      conversationArray = conversationArray.map((convId) => {
        const lastMessage = data[convId].messages
          ? Object.values(data[convId].messages).slice(-1)[0]
          : null;
        let unread = false;

        // Nếu tin nhắn mới là từ client, đánh dấu cuộc trò chuyện là "chưa đọc"
        if (lastMessage && lastMessage.sender !== "admin") {
          const lastMessageIdAdminRead = data[convId].lastMessageIdAdminRead;
          const lastMessageId = Object.keys(data[convId].messages).slice(-1)[0];
          if (lastMessageIdAdminRead !== lastMessageId) {
            unread = true;
          }
        }

        return {
          key: convId,
          unread,
        };
      });

      conversationArray = conversationArray.sort((a, b) => {
        const lastMessageA = data[a.key].messages
          ? Object.values(data[a.key].messages).slice(-1)[0].timestamp
          : 0;
        const lastMessageB = data[b.key].messages
          ? Object.values(data[b.key].messages).slice(-1)[0].timestamp
          : 0;

        // Sắp xếp theo trạng thái "unread" trước, rồi mới sắp xếp theo thời gian
        if (a.unread && !b.unread) return -1;
        if (!a.unread && b.unread) return 1;

        return lastMessageB - lastMessageA;
      });
      setConversations(conversationArray);
    });

    // Cleanup subscription
    return () => conversationsRef.off();
  }, []);

  // Lấy tin nhắn của cuộc trò chuyện đang chọn
  useEffect(() => {
    if (activeConversation) {
      const messagesRef = db.ref(
        `conversations/${activeConversation}/messages`
      );
      messagesRef.on("value", (snapshot) => {
        const data = snapshot.val();
        let messageArray = data ? Object.values(data) : [];

        const lastMessage = Object.values(data).slice(-1)[0];
        if (lastMessage && lastMessage.sender !== "admin") {
          const lastMessageId = Object.keys(data).slice(-1)[0];
          const convRef = db.ref(`conversations/${activeConversation}`);
          convRef.update({ lastMessageIdAdminRead: lastMessageId });
        }

        messageArray = messageArray.sort((a, b) => {
          const lastMessageA = a.timestamp;
          const lastMessageB = b.timestamp;
          return lastMessageB - lastMessageA;
        });
        setMessages(messageArray);
      });

      // Cleanup subscription
      return () => messagesRef.off();
    }
  }, [activeConversation]);

  // Gửi tin nhắn
  const sendMessage = (newMessage) => {
    if (newMessage.trim() !== "") {
      const messagesRef = db.ref(
        `conversations/${activeConversation}/messages`
      );
      messagesRef.push({
        sender: "admin",
        text: newMessage,
        timestamp: Date.now(),
      });
    }
  };

  const getName = useCallback(
    (sender) => {
      if (!sender) return "";
      if (sender === "admin") return "Bạn";
      const userId = sender.startsWith("userId-")
        ? sender.replace("userId-", "")
        : "";
      if (!userId) return sender;
      return (
        users.find((user) => user.id.toString() === userId)?.name || sender
      );
    },
    [users]
  );

  return (
    <div style={{ display: "flex", flex: 1, position: "relative" }}>
      <div className="conversation-list">
        <h4 style={{ padding: "10px 0px 10px 5px" }}>Danh sách tin nhắn</h4>
        {conversations.map((conv) => (
          <div
            key={conv.key}
            style={
              conv.key === activeConversation ? { backgroundColor: "#ccc" } : {}
            }
            className="conversation-item"
            onClick={() => setActiveConversation(conv.key)}
          >
            <span>{getName(conv.key)}</span>
            {conv.unread && (
              <span
                style={{
                  backgroundColor: "red",
                  width: 10,
                  height: 10,
                  borderRadius: 10,
                }}
              ></span>
            )}
          </div>
        ))}
      </div>
      {activeConversation && (
        <div className="chat-container">
          <div className="chat-box">
            {messages.map((msg, index) => (
              <div
                key={index}
                style={
                  msg.sender === "admin"
                    ? { display: "flex", justifyContent: "flex-end" }
                    : {}
                }
              >
                <strong>{`${getName(msg.sender)}:`}&nbsp;</strong>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chat-bottom">
            <NewMessage sendMessage={sendMessage} />
          </div>
        </div>
      )}
    </div>
  );
}

const NewMessage = ({ sendMessage }) => {
  const [newMessage, setNewMessage] = useState("");

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (newMessage.trim() !== "") {
        sendMessage(newMessage);
        setNewMessage("");
      }
    }
  };
  return (
    <>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        style={{ flex: 1 }}
        onKeyDown={handleKeyDown}
        placeholder="Nhập tin nhắn"
      />
      <button
        onClick={() => {
          if (newMessage.trim() !== "") {
            sendMessage(newMessage);
            setNewMessage("");
          }
        }}
        style={{ marginLeft: 5, width: 100 }}
        className="btn btn-primary"
      >
        Gửi
      </button>
    </>
  );
};

export default ChatPage;
