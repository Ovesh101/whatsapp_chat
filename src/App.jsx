import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { MessageProvider } from "./context/MessageContext";
import Login from "./components/Login";
import ChatWindow from "./components/ChatWindow";
import MessageInput from "./components/MessageInput";
import { UserProvider } from "./context/UserContext";
import Dashboard from "./components/Dashboard";

const ChatLayout = () => (
  <div className="flex-1  h-screen flex flex-col">
    <div className="flex-1 bg-[#0B141A] overflow-y-auto ">
      <ChatWindow />
    </div>
    <MessageInput />
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />, // Dashboard serves as the main layout
    children: [
      
      {
        path: "chat_window", // Nested route for Chat
        element: (
          <ChatLayout />
        ),
      },
    ],
  },
  {
    path: "/mobile_chat", // Nested route for Chat
    element: (
      <ChatLayout />
    ),
  },
]);

const App = () => {
  return (
    <UserProvider>
      <MessageProvider>
        <RouterProvider router={router} />
      </MessageProvider>
    </UserProvider>
  );
};

export default App;
