import React, { useEffect, useState } from "react";
import { useMessageContext } from "../context/MessageContext";
import useInstantDB from "../Hooks/useInstantDB";
import { useUser } from "../context/UserContext";

const ContactList = () => {
  const { state, dispatch } = useMessageContext();
  const { addMessage, messages } = useInstantDB();
  const [selectedContact, setSelectedContact] = useState(null);
  const { users, user } = useUser();  // Assuming users are stored here

  // List of contacts (assuming this is the list of all users in your app)
  const contacts = users?.$users || [];  // Fetching users from the context

  useEffect(() => {
    if (state.selectedContact) {
      // Fetch messages between the logged-in user and the selected contact
      const loggedInUserId = user.email;  // Assuming this is stored in state or context
      const selectedContactId = state.selectedContact;

      const filteredMessages = messages.filter(
        (msg) =>
          (msg.senderId === loggedInUserId && msg.receiverId === selectedContactId) ||
          (msg.senderId === selectedContactId && msg.receiverId === loggedInUserId)
      );

      // Set the filtered messages in the state
      dispatch({ type: "SET_MESSAGES", payload: filteredMessages });
    }
  }, [state.selectedContact]);

//   const handleSendMessage = (messageText) => {
//     const senderId = state.userId;  // Get the logged-in user's ID
//     const receiverId = state.selectedContact;  // Get the selected contact's ID

//     addMessage(senderId, receiverId, messageText);
//     dispatch({ type: "ADD_MESSAGE", payload: { senderId, receiverId, text: messageText, createdAt: Date.now() } });
//   };

  const handleSelectContact = (email) => {
    setSelectedContact(email); // Update the selected contact
    dispatch({ type: "SELECT_CONTACT", payload: email }); // Dispatch the action
  };

  return (
<div className="overflow-y-auto p-4">
      <h2 className="font-bold text-lg mb-4">Contacts</h2>
      <ul className="space-y-2">
        {contacts
          .filter((contact) => contact.email !== user.email) // Exclude the logged-in user's email
          .map((contact) => {
            const name = localStorage.getItem(contact.email) || contact.email; // Fetch name or fallback to email
            const isActive = selectedContact === contact.email; // Check if this contact is selected

            return (
              <li
                key={contact.id}
                className={`flex items-center p-2 rounded cursor-pointer ${
                  isActive ? "bg-[#e1f7d5]" : "hover:bg-[#f0f0f0]"
                }`}
                onClick={() => handleSelectContact(contact.email)}
              >
                <span className="text-black">{name}</span> {/* Render name if available */}
              </li>
            );
          })}
      </ul>
    </div>

  );
};

export default ContactList;
