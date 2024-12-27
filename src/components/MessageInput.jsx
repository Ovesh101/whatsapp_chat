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


      setNewMessage(""); // Clear the input field
    }
  };

  if (!state.selectedContact) {
    // Show this message if no contact is selected
    return (
  <></>
    );
  }

  return (
    <div className=" p-4  flex items-center">
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a message"
        className="flex-1 p-2 text-white  bg-[#2A3942] focus:outline-none rounded-md mr-4"
      />
      <button
        onClick={sendMessage}
        className="bg-green-500 text-white py-2 px-4 rounded-md"
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;
