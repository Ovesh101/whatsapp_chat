import React from "react";
import { useUser } from "../context/UserContext"; // Importing the user context to get the logged-in user's data

const Message = ({ message }) => {
  const { user } = useUser(); // Get the logged-in user

  // Conditionally set the message alignment and style based on the sender
  const isUserMessage = message.senderId === user.email;

  return (
    <div className={`flex ${isUserMessage ? "justify-end" : "justify-start"} mb-2`}>
      <div
        className={`max-w-xs p-3 rounded-lg shadow ${
          isUserMessage
            ? "bg-[#005C4B] text-white rounded-br-none"
            : "bg-[#202C33] text-white rounded-bl-none"
        }`}
      >
        <p className="text-sm">{message.text}</p>
        <span className="text-[10px] text-gray-500 block text-right mt-1">
          {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
};

export default Message;
