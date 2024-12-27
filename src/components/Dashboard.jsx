import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

import ContactList from "./ContactList";

const Dashboard = () => {
  const { user } = useUser();

  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false); // Track if the user is on mobile

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const isMobileWidth = window.innerWidth <= 768; // Check based on screen width
      const isMobileNavigator = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(
        navigator.userAgent
      ); // Check based on navigator.userAgent
  
      const newIsMobile = isMobileWidth || isMobileNavigator; // Consider either condition to detect mobile
  
      if (newIsMobile !== isMobile) {
        setIsMobile(newIsMobile); // Update state only when it changes
        console.log(
          `Width: ${window.innerWidth}, Navigator is mobile: ${isMobileNavigator}, State updated: ${newIsMobile}`
        );
      }
    };
  
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile]); // Add isMobile as a dependency
  

  useEffect(() => {
    if (isMobile) {
      navigate("/dashboard/chat_window");
    }
  }, [isMobile, navigate]);

  return (
    <div className="flex  h-screen bg-[#dfe3e6]">
      {/* Sidebar: Contact List */}
      <div className=" sm:w-1/4 w-full bg-white shadow-lg">
        <ContactList isMobile={isMobile} />
      </div>
      {!isMobile && (
        <div className="w-full bg-[#222E35]  h-full">
          <Outlet /> {/* This will render nested routes */}
        </div>
      )}

      
    </div>
  );
};

export default Dashboard;
