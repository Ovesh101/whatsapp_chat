import React, { useEffect, useState } from "react";
import useInstantDB from "../Hooks/useInstantDB";

const TestInstantDB = () => {
  const { addMessage, messages, isLoading, error } = useInstantDB();
  const [newMessage, setNewMessage] = useState("");

  const testDB = async () => {
    // Add a test message to InstantDB
    await addMessage(newMessage);
    setNewMessage(""); // Clear the input field
  };

  useEffect(() => {
    // Optionally, you can fetch messages when the component mounts.
    // However, `useMessages` hook already fetches data, so this might be redundant.
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Enter a new message"
        />
        <button onClick={testDB}>Add Message</button>
      </div>
      <div>
        <h3>Messages from InstantDB:</h3>
        <ul>
          {messages.length > 0 ? (
            messages.map((msg, index) => <li key={index}>{msg.text}</li>)
          ) : (
            <li>No messages found</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default TestInstantDB;
