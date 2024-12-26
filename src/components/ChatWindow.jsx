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



  if (!state.selectedContact) {
    // Show this message if no contact is selected
    return (
      <div className="flex bg-[#222E35] items-center justify-center h-full text-gray-500">
        Please select a contact to chat with.
      </div>
    );
  }

  // Filter messages for the selected contact and the logged-in user
  const filteredMessages = state.messages.filter(
    (msg) =>
      (msg.senderId === user.email &&
        msg.receiverId === state.selectedContact) ||
      (msg.receiverId === user.email && msg.senderId === state.selectedContact)
  );

  return (
    <>
  
    <div className="flex h-screen flex-col bg-[#0B141A]">
      {/* Header */}
      <div className="bg-[#202C33] text-white px-4 py-2 shadow-md flex justify-between items-center fixed w-3/4">
        <div className="flex items-center">
          <div className="w-10 h-10 flex items-center justify-center bg-green-500 rounded-full text-lg text-white mr-4">
            {localStorage.getItem(state.selectedContact)
              ? localStorage.getItem(state.selectedContact)[0]
              : "?"}
          </div>
          <h3 className="text-lg font-semibold truncate">
            {localStorage.getItem(state.selectedContact) || "Chat"}
          </h3>
        </div>


      </div>

      {/* Chat Messages */}
      <div className="flex-grow mt-14 p-4 overflow-y-auto">
        {filteredMessages.length > 0 ? (
          filteredMessages.map((msg, index) => (
            <Message key={index} message={msg} />
          ))
        ) : (
          <div className="text-gray-500 text-center mt-4">No messages</div>
        )}
      </div>
    
    </div>
    {/* <MessageInput/> */}
    </>
  );
};

export default ChatWindow;
