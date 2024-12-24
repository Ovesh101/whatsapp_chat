import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MessageProvider } from "./context/MessageContext";
import Login from "./components/Login";
import ContactList from "./components/ContactList";
import ChatWindow from "./components/ChatWindow";
import MessageInput from "./components/MessageInput";
import { UserProvider } from "./context/UserContext";
import Dashboard from "./components/Dashboard";

// Create routes using createBrowserRouter
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />
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
