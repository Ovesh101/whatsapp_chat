import { init, i, id } from "@instantdb/react";
import useIndexedDB from "./useIndexedDB"; // Import your IndexedDB hook
import { useEffect } from "react";

// Replace this with your actual InstantDB App ID
const APP_ID = import.meta.env.VITE_API_KEY;

// Define the schema for messages
const schema = i.schema({
    entities: {
      messages: i.entity({
        text: i.string(), // Message content
        createdAt: i.number(), // Timestamp of message creation
        senderId: i.string(), // Sender's user ID
        receiverId: i.string(), // Receiver's user ID
        
      }),
    },
  });
  

// Initialize the InstantDB instance with the schema
const db = init({ appId: APP_ID, schema });

const useInstantDB = () => {
  const { addMessage: addMessageToIndexedDB, getMessages: getMessagesFromIndexedDB, deleteMessageFromIndexedDB } = useIndexedDB();

  // Add a new message to both InstantDB and IndexedDB
  const addMessage = async (senderId, receiverId, messageText) => {
    const newMessage = {
      senderId: senderId,
      receiverId: receiverId,
      text: messageText,
      createdAt: Date.now(),  // Current timestamp
   
    };
  
    // Store in IndexedDB (for offline support)
    await addMessageToIndexedDB(newMessage);
  
    // Store in InstantDB (cloud storage)
    db.transact(
      db.tx.messages[id()].update(newMessage) // Update the message in the InstantDB
    );
  };

  const updateMessageReadStatus = async (loggedInUserId, selectedContactId) => {
    // Find messages between the logged-in user and the selected contact
    const messagesToUpdate = messages.filter(
      (msg) =>
        (msg.senderId === loggedInUserId && msg.receiverId === selectedContactId) ||
        (msg.senderId === selectedContactId && msg.receiverId === loggedInUserId)
    );
  
    // Loop through the messages and mark them as read
    for (let msg of messagesToUpdate) {
      if (!msg.read) {  // Only update if the message is unread
        const updatedMessage = { ...msg, read: true };
        await db.transact(
          db.tx.messages[id()].update(updatedMessage)
        );
      }
    }
  };
  
  
  

  // Fetch messages from InstantDB (real-time cloud storage)
  const { isLoading, error, data } = db.useQuery({
    messages: {
      filter: (msg) => msg.senderId || msg.receiverId,  // Filtering messages
    },
  });

  const messages = data?.messages || [];


  const syncOfflineMessages = async () => {
    const offlineMessages = await getMessagesFromIndexedDB();

    // Sync each offline message to InstantDB
    offlineMessages.forEach((message) => {
      db.transact(
        db.tx.messages[id()].update(message)
      );
    });

    // After syncing, delete the messages from IndexedDB
    offlineMessages.forEach(async (message) => {
      await deleteMessageFromIndexedDB(message.id);
    });
  };

  // Check online status and sync when going online
  const checkOnlineStatus = () => {
    if (navigator.onLine) {
      syncOfflineMessages(); // Sync messages when back online
    }else{
        console.log("not online");
        
    }
  };

  // Listen for online status changes
  useEffect(() => {
    window.addEventListener('online', checkOnlineStatus);
    return () => window.removeEventListener('online', checkOnlineStatus);
  }, []);

  return { addMessage, updateMessageReadStatus, isLoading, error, messages, syncOfflineMessages };
};

export default useInstantDB;
