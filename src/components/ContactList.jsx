import React, { useEffect, useState } from "react";
import { useMessageContext } from "../context/MessageContext";
import useInstantDB from "../Hooks/useInstantDB";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ContactList = () => {
  const { state, dispatch } = useMessageContext();
  const { messages } = useInstantDB();
  const { users, user, signOut } = useUser(); // Assuming you have a logout function in UserContext
  const [searchText, setSearchText] = useState(""); // Search query state
  const [searchTimeout, setSearchTimeout] = useState(null); // Timeout for debounce
  const [filteredContacts, setFilteredContacts] = useState([]); // Filtered contacts state
  const [allContacts, setAllContacts] = useState([]); // All contacts

  const navigate = useNavigate();

  // Initialize contacts
  useEffect(() => {
    if (user && user.email) {
      const contactList =
        users?.$users?.filter((contact) => contact.email !== user.email) || [];
      setAllContacts(contactList);
      setFilteredContacts(contactList); // Initially, all contacts are displayed
    }
  }, [users, user]);

  useEffect(() => {
    if (state.selectedContact && user && user.email) {
      const loggedInUserId = user.email;
      const selectedContactId = state.selectedContact;

      const filteredMessages = messages.filter(
        (msg) =>
          (msg.senderId === loggedInUserId &&
            msg.receiverId === selectedContactId) ||
          (msg.senderId === selectedContactId &&
            msg.receiverId === loggedInUserId)
      );

      dispatch({ type: "SET_MESSAGES", payload: filteredMessages });
    }
  }, [state.selectedContact, messages, user, dispatch]);

  // Filter contacts based on search text
  const filterContacts = (query) => {
    const regex = new RegExp(query, "i"); // Case-insensitive search
    return allContacts.filter((contact) => regex.test(contact.email));
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchText(query);

    // Clear existing timeout and debounce the search
    clearTimeout(searchTimeout);
    setSearchTimeout(
      setTimeout(() => {
        const results = filterContacts(query);
        setFilteredContacts(results); // Update filtered contacts
      }, 300) // 300ms debounce delay
    );
  };

  const handleSelectContact = (email) => {
    dispatch({ type: "SELECT_CONTACT", payload: email });
  };

  const handleLogout = async () => {
    await signOut(); // Call the signOut function to log out
    toast.success("Logged out successfully!"); // Display success toast message
    navigate("/"); // Redirect to login page
  };

  return (
    <div className="p-4 pt-2 bg-[#111B21] text-white h-full flex flex-col">
      <div className="flex pb-4 pt-2 items-center">
        <h2 className="text-lg font-bold">Contacts</h2>
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search contacts..."
          value={searchText}
          onChange={handleSearchChange}
          className="w-full px-4 py-2 bg-[#202C33] text-white rounded-md focus:outline-none"
        />
      </div>
      <ul className="space-y-4 overflow-y-auto">
        {filteredContacts.length > 0 ? (
          filteredContacts.map((contact) => {
            const name = localStorage.getItem(contact.email) || contact.email;
            const firstLetter = contact.email[0].toUpperCase();

            // Check if the contact is selected
            const isActive = state.selectedContact === contact.email;

            return (
              <li
                key={contact.id}
                className={`flex items-center p-3 rounded-md cursor-pointer ${
                  isActive ? "bg-[#2A3942]" : "hover:bg-[#202C33]"
                }`}
                onClick={() => handleSelectContact(contact.email)}
              >
                <div className="w-10 h-10 flex items-center justify-center bg-green-500 rounded-full text-lg text-white mr-4">
                  {firstLetter}
                </div>
                <span className="text-white">{name}</span>
              </li>
            );
          })
        ) : (
          <div className="text-gray-500 text-center py-4">
            No contacts found
          </div>
        )}
      </ul>

      {/* Profile Section */}
      {user && (
        <div className="mt-auto p-4 bg-[#202C33] rounded-md flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 flex items-center justify-center bg-blue-500 rounded-full text-lg text-white mr-4">
              {user.email[0].toUpperCase()}
            </div>
            <span className="text-white">
              {localStorage.getItem(user.email)}
            </span>
          </div>
          <button
            onClick={handleLogout} // Add logout functionality here
            className="text-white bg-red-600 hover:bg-red-700  py-1 px-4 rounded-md focus:outline-none"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ContactList;
