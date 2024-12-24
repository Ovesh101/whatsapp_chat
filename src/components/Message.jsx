import React from "react";
import { useUser } from "../context/UserContext"; // Importing the user context to get the logged-in user's data

const Message = ({ message }) => {
  const { user } = useUser(); // Get the logged-in user

  // Conditionally set the message alignment based on the sender
  const isUserMessage = message.senderId === user.email;

  return (
    <div className={`flex ${isUserMessage ? "justify-end" : "justify-start"} mb-2`}>
      <div
        className={`max-w-xs p-2 rounded-lg ${isUserMessage ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}
      >
        <p className="text-sm">
          {message.text}
        </p>
      </div>
    </div>
  );
};

export default Message;
