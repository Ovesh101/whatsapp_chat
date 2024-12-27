# WhatsApp Web-Like Chat Application
This project aimed to create a WhatsApp Web-like chat application using React.js. 
The application includes real-time messaging using InstantDB and offline capabilities via IndexedDB.

## Table of Contents
2. [Features](#features)
3. [Technical Requirements Fulfilled](#technical-requirements-fulfilled)
    - [React Concepts](#react-concepts)
    - [Components](#components)
4. [Installation](#installation)
5. [Usage Instructions](#usage-instructions)
6. [Design Choices](#design-choices)

8. [Challenges Faced](#challenges-faced)

9. [Deployment](#deployment)
    
### Features:
1. Contact List:
   - Displays a list of contacts on the left side of the application.
   - Clicking on a contact opens their chat history in the chat window.

2. Chat Window:
   - Displays the chat history of the selected contact.
   - Shows individual messages with timestamps.

3. Message Field:
   - Allows users to send new messages.
   - Automatically syncs with InstantDB for real-time updates.

4. Message Storage:
   - Real-time message storage and retrieval using InstantDB.
   - Offline data storage using IndexedDB, ensuring chat functionality even without an internet connection.
   - Logic is written at /src/Hooks/useIntantDB.js
     ```
     const syncOfflineMessages = async () => {
        const offlineMessages = await getMessagesFromIndexedDB();
        offlineMessages.forEach((message) => {
      db.transact(
        db.tx.messages[id()].update(message)
      );
        });
        offlineMessages.forEach(async (message) => {
      await deleteMessageFromIndexedDB(message.id);
        });
      };
     ```
    
5. Authentication:
    - Handles user authentication using InstantDB's email-based authentication with the "magic code" feature.
   - Allows users to log in with their email address and receive a one-time code for secure access.
   - Integrates with InstantDB Auth API to validate and manage session tokens.

## Technical Requirements Fulfilled:
  ### React Concepts:
  - useState: Manage states like selected contact and message input.
  - useEffect: Fetch and sync data with InstantDB and IndexedDB.
  - useMemo: Optimize performance by memoizing computed data like filtered contacts.
  - useReducer: Manage complex state logic for contacts and messages.
  - Custom Hooks: Encapsulate reusable logic for interacting with InstantDB and IndexedDB.

  - Context API:
    - Used for global state management of contacts and messages.
      
  ### Components:
  1. ContactList:
   - Displays a list of contacts.
   - Allows selection of a contact to view their chat history.

  2. ChatWindow:
   - Displays chat history and a message input field for the selected contact.

  3. Message:
   - Renders individual messages with timestamps.

  4. MessageInput:
   - Input field for sending new messages.
     
  5. Login:
   - Handles user authentication using InstantDB's email-based authentication with the "magic code" feature.
   - Allows users to log in with their email address and receive a one-time code for secure access.
   - Integrates with InstantDB Auth API to validate and manage session tokens.

## Installation

Follow these steps to set up and run the application locally:

### Prerequisites

Ensure that you have the following installed on your system:
- [Node.js](https://nodejs.org/) (v16.x or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) (package manager)

### Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Ovesh101/whatsapp_chat.git
   cd whatsapp_chat
   npm install
    ```
2: **Set Up Environment Variables**
  ```
    VITE_API_KEY=1f9655e4-9b03-4e95-ac0f-6df9ea7d765e
  ```
3: **Start the Application**: 
  ```
    npm run dev
  ```

### Design Choices

- **Component-Based Architecture**: The application is divided into reusable components, such as `ContactList`, `ChatWindow`, `Message`, `MessageInput`, and `Login`. This modular design enhances code maintainability and reusability.
- **Real-Time Data Management**: InstantDB is used for real-time message storage and retrieval, ensuring seamless synchronization between users.
- **Offline Support**: IndexedDB stores chat data locally, providing offline access to messages and ensuring continuity in case of network disruptions.
- **Email-Based Authentication**: The login functionality is implemented using InstantDB's Magic Code feature for secure and seamless user authentication.
- **Responsive Design**: Tailored layouts and dynamic resizing ensure the application provides an optimal experience across various screen sizes.

---

### Challenges Faced

1. **Integration of InstantDB**: Adapting to the InstantDB API for real-time messaging and authentication required careful configuration and testing.
2. **Offline-First Approach**: Implementing IndexedDB for offline data storage demanded efficient synchronization between local and remote databases.
3. **Authentication Workflow**: Setting up the email-based authentication via InstantDB’s Magic Code feature involved understanding their SDK and ensuring a smooth user experience.

---

## Usage Instruction

### Usage of Hooks, Context, Custom Hooks, useReducer, InstantDB, and IndexedDB

#### 1. Hooks
- **`useState`**:
  - Used extensively to manage component-level states such as the currently selected contact, message input, and authentication status.
  - Simplifies the management of dynamic data and reactivity within individual components.

- **`useEffect`**:
  - Handles side effects such as fetching data from InstantDB, synchronizing with IndexedDB, and updating components based on state changes.
  - Ensures proper synchronization between the online and offline databases and updates UI dynamically.

#### 2. Context
- **User Context**:
  - Created to manage user authentication globally across the application.
  - Stores user login information, ensuring consistent access to authentication status in all components.

- **Message Context**:
  - Manages the global state of messages and chats between contacts.
  - Centralizes message handling, making it easier to fetch, store, and update chat data.

#### 3. Custom Hooks
- Custom hooks were implemented to encapsulate reusable logic:
  - **Interacting with InstantDB** for real-time storage and retrieval of messages.
  - **Handling IndexedDB** operations for offline storage, ensuring smooth offline access to data.

#### 4. useReducer
- Used to manage complex state updates, particularly for storing and organizing chats between two people.
- Facilitates efficient handling of chat data by centralizing state logic and making it easier to implement features like adding, updating, and deleting messages.

#### 5. InstantDB
- **Online Database**:
  - Provides real-time storage and retrieval of messages.
  - Ensures instantaneous synchronization of messages between users.
  - Plays a crucial role in handling real-time communication functionality.

#### 6. IndexedDB
- **Offline Database**:
  - Used to store data locally for offline access.
  - Ensures that chat history and messages are available even when the user is offline.
  - Synchronizes with InstantDB when the application comes back online, maintaining data integrity (you can see this logic ***/src/Hooks/useInstantDB.js***).

## Deployment

### Live URL:
You can access the deployed application at:  
[https://whatsapp-chat-phi.vercel.app/](https://whatsapp-chat-phi.vercel.app/)








