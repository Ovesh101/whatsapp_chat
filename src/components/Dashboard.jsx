import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useMessageContext } from "../context/MessageContext";
import { toast } from "react-hot-toast";
import ChatWindow from "./ChatWindow";
import ContactList from "./ContactList";
import MessageInput from "./MessageInput";

const Dashboard = () => {
  const { signOut , user } = useUser();
  const navigate = useNavigate();
  const { state } = useMessageContext();

  useEffect(()=>{
    if(!user){
        navigate("/")
    }

  } , [])



  const handleLogout = async() => {
    await signOut(); // Call the signOut function to log out
    toast.success("Logged out successfully!"); // Display success toast message
    navigate("/"); // Redirect to login page
  };

  return (
    <div className="flex h-screen bg-[#dfe3e6]">
      {/* Sidebar: Contact List */}
      <div className="w-1/4 bg-white shadow-lg">
        <div className="p-4 border-b">
          <button
            className="bg-red-500 text-white py-2 px-4 rounded-full w-full"
            onClick={handleLogout}
          >
            Log Out
          </button>
        </div>
        <ContactList />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto bg-[#ece5dd]">
          <ChatWindow />
        </div>
        <MessageInput />
      </div>
    </div>
  );
};

export default Dashboard;
