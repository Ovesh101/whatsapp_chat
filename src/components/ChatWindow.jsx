import React from "react";
import { useMessageContext } from "../context/MessageContext";
import { useUser } from "../context/UserContext"; // To get the logged-in user
import Message from "./Message";

const ChatWindow = () => {
  const { state } = useMessageContext();
  const { user } = useUser(); // Get the current logged-in user

  if (!user || !user.email) {
    // Handle case where user or user.email is not defined
    return <div>Loading...</div>;
  }

  console.log("state in reducer", state);
  
  // Filter messages for the selected contact and the logged-in user
  const filteredMessages = state.messages.filter(
    (msg) =>
      (msg.senderId === user.email && msg.receiverId === state.selectedContact) ||
      (msg.receiverId === user.email && msg.senderId === state.selectedContact)
  );

  return (
    <div className="p-4">
      <h3 className="text-xl font-bold mb-4">{localStorage.getItem(state.selectedContact)}</h3>
      <div className="space-y-4">
        {filteredMessages.length > 0 ? (
          filteredMessages.map((msg, index) => (
            <Message key={index} message={msg} />
          ))
        ) : (
          <div className="text-gray-500">No messages</div>
        )}
      </div>
    </div>
  );
};

export default ChatWindow;
