import React, { useState, useEffect, useRef, useMemo } from "react";
import { db } from "../../firebase";
import "./index.css";
import { CloseOutlined } from "@ant-design/icons";
import callApi from "../../utils/apiCaller";

export const CHAT_CLIENT_ID_KEY = "CHAT_CLIENT_ID_KEY";

function ChatPopup() {
  const [messages, setMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const chatContainerRef = useRef(null);
  const [clientId, setClientId] = useState("");
  const [unread, setUnread] = useState(false);

  useEffect(() => {
    const clId = localStorage.getItem(CHAT_CLIENT_ID_KEY);
    const getKey = async () => {
      const token = localStorage.getItem("_auth");
      let userId = "";
      if (token) {
        const resData = await callApi("users/me", "GET", null, token);
        userId = resData?.data?.results?.[0]?.id || "";
      }
      if (userId) {
        if (clId && clId.startsWith("userId-")) {
          const oldUserId = clId.replace("userId-", "");
          if (oldUserId === userId.toString()) {
            setClientId(clId);
            return;
          }
        }
        const newClId = `userId-${userId}`;
        localStorage.setItem(CHAT_CLIENT_ID_KEY, newClId);
        setClientId(newClId);
      } else {
        if (clId && clId.startsWith("client-")) {
          setClientId(clId);
          return;
        }
        const newClId = `client-${Date.now()}`;
        localStorage.setItem(CHAT_CLIENT_ID_KEY, newClId);
        setClientId(newClId);
      }
    };

    getKey();
  }, []);

  const messagesRef = useMemo(() => {
    const conversationId = `${clientId}`;
    return db.ref(`conversations/${conversationId}`);
  }, [clientId]);

  // Lấy tin nhắn từ Firebase
  useEffect(() => {
    messagesRef.on("value", (snapshot) => {
      const dataConv = snapshot.val();
      const data = dataConv?.messages;
      let messageArray = data ? Object.values(data) : [];
      const lastMessage = messageArray.slice(-1)[0];
      let newUnread = false;
      if (lastMessage?.sender === "admin") {
        const lastMessageId = Object.keys(data).slice(-1)[0];
        const lastMessageIdClientRead = dataConv.lastMessageIdClientRead
        if (lastMessageId !== lastMessageIdClientRead) {
          if (!isOpen) newUnread = true
          messagesRef.update({lastMessageIdClientRead: lastMessageId})
        }
      }

      messageArray = messageArray.sort((a, b) => {
        const lastMessageA = a.timestamp
        const lastMessageB = b.timestamp
        return lastMessageB - lastMessageA;
      });

      setMessages(messageArray);
      setUnread(newUnread)
    });

    return () => messagesRef.off();
  }, [isOpen, messagesRef]);

  // Gửi tin nhắn
  const sendMessage = (msg) => {
    if (msg.trim()) {
      db.ref(`conversations/${clientId}/messages`).push({
        sender: clientId,
        text: msg,
        timestamp: Date.now(),
      });
    }
  };

  if (!isOpen) {
    return (
      <div className="ic-mess-fit" onClick={() => setIsOpen(!isOpen)}>
        <img src="/images/ic-mess.png" alt="ic-mess" style={{ width: 50 }} />
        {unread && (
          <span
            style={{
              backgroundColor: "red",
              width: 10,
              height: 10,
              borderRadius: 10,
              position: "fixed",
              right: 15,
            }}
          ></span>
        )}
      </div>
    );
  }

  return (
    <div className="chat-popup">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 4,
        }}
      >
        <span></span>
        <span style={{ fontSize: 16, fontWeight: 500 }}>Trò chuyện</span>
        <CloseOutlined
          style={{ cursor: "pointer" }}
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>
      <div
        // className="chat-messages"
        ref={chatContainerRef}
        style={{
          height: "300px", // Chiều cao khung chat
          overflowY: "scroll",
          display: "flex",
          flexDirection: "column-reverse", // Để hiển thị tin nhắn mới nhất lên đầu
          padding: "0px 5px",
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={
              msg.sender === clientId
                ? { display: "flex", justifyContent: "flex-end" }
                : {}
            }
          >
            <strong>{msg.sender === clientId ? "Bạn" : msg.sender}:&nbsp;</strong>
            {msg.text}
          </div>
        ))}
      </div>

      <NewMessage onSendMessage={sendMessage} />
    </div>
  );
}

const NewMessage = ({ onSendMessage }) => {
  const [newMessage, setNewMessage] = useState("");
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (newMessage.trim() !== "") {
        onSendMessage && onSendMessage(newMessage);
        setNewMessage("");
      }
    }
  };
  return (
    <div style={{ marginTop: 10 }}>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        style={{ flex: 1, borderRadius: 5, width: "calc(100% - 60px)" }}
        onKeyDown={handleKeyDown}
        placeholder="Nhập tin nhắn"
      />
      <button
        onClick={() => {
          if (newMessage) {
            onSendMessage && onSendMessage(newMessage);
            setNewMessage("");
          }
        }}
        className="btn-send-message"
      >
        Gửi
      </button>
    </div>
  );
};

export default ChatPopup;
