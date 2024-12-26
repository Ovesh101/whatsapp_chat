import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useMessageContext } from "../context/MessageContext";
import { toast } from "react-hot-toast";
import ChatWindow from "./ChatWindow";
import ContactList from "./ContactList";
import MessageInput from "./MessageInput";

const Dashboard = () => {
     
  const { user } = useUser();
  const navigate = useNavigate();
 

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, []);
  

  return (
    <div className="flex  h-screen bg-[#dfe3e6]">
      {/* Sidebar: Contact List */}
      <div className="w-1/4 bg-white shadow-lg">
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
