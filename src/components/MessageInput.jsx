import React, { useState } from "react";
import { useMessageContext } from "../context/MessageContext";
import useInstantDB from "../Hooks/useInstantDB";
import { toast } from "react-hot-toast";
import { useUser } from "../context/UserContext";

const MessageInput = () => {
  const { state, dispatch } = useMessageContext();
  const {user} = useUser();
  const { addMessage } = useInstantDB();
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = async () => {
    if (newMessage.trim()) {
        const message = {
            text: newMessage,
            createdAt: Date.now(),
            senderId: user?.email, // Dynamically get the sender ID from the context
            receiverId: state.selectedContact, // Receiver ID (contact selected)
           
          };

      dispatch({ type: "ADD_MESSAGE", payload: message }); // Update the state
      await addMessage(message.senderId, message.receiverId, message.text);


      toast.success("Message sent!"); // Display success toast

      setNewMessage(""); // Clear the input field
    }
  };

  return (
    <div className="bg-white p-4 flex items-center">
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a message"
        className="flex-1 p-2 border rounded-full mr-4"
      />
      <button
        onClick={sendMessage}
        className="bg-green-500 text-white py-2 px-4 rounded-full"
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;
