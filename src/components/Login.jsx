import React, { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext'; // Ensure correct import of useUser
import { init } from '@instantdb/react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const APP_ID = "1f9655e4-9b03-4e95-ac0f-6df9ea7d765e";
const db = init({ appId: APP_ID });

const Login = () => {
    const navigate = useNavigate();
  const { user, signInWithMagicCode, signOut } = useUser(); // Access user context correctly
  const [sentEmail, setSentEmail] = useState('');

  // Early return if user is logged in

  useEffect(()=>{
    if (user) {
        navigate("/dashboard")
      }
  } , [])


  return (
    <div className="flex p-4 justify-center items-center h-screen">
      {!sentEmail ? (
        <Email setSentEmail={setSentEmail} />
      ) : (
        <MagicCode sentEmail={sentEmail} />
      )}
      <Toaster />
    </div>
  );
};


const Email = ({ setSentEmail }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');  // Add name state

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !name) return;  // Make sure both email and name are provided

    localStorage.setItem(email, name);

    setSentEmail(email);
    
    // Send email and name to the API or perform any other operation
    db.auth.sendMagicCode({ email }).then(() => {
      toast.success('code sent successfully on your registered email address!');
      // Optionally, you can also store the name or use it later in the process
      console.log("User name:", name);
    }).catch((err) => {
      toast.error('Uh oh! ' + err.body?.message);
      setSentEmail('');
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center w-full max-w-md p-4 bg-[#2A3942] shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-white mb-6">Enter The Chat Room</h2>
      <div className="mb-4 w-full">
        <input
          className="w-full p-3 text-white bg-[#202C33] rounded-md"
          placeholder="Enter your name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-4 w-full">
        <input
          className="w-full p-3 text-white  bg-[#202C33] rounded-md"
          placeholder="Enter your email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button type="submit" className="w-full p-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600">
        Send Code
      </button>
    </form>
  );
};




const MagicCode = ({ sentEmail }) => {
  const [code, setCode] = useState('');
  const { user , setUser } = useUser(); // Access user context correctly
  const navigate = useNavigate();

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { user } = await db.auth.signInWithMagicCode({ email: sentEmail, code: code });
      setUser(user)
      navigate("/dashboard")
      
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };
  
  

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center w-full max-w-md p-4 bg-[#2A3942] shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-white mb-6">Okay, we sent you an email! What was the code?</h2>
      <div className="mb-4 w-full">
        <input
          className="w-full p-3 text-white  bg-[#202C33] rounded-md"
          type="text"
          placeholder="123456..."
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </div>
      <button type="submit" className="w-full p-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600">
        Verify
      </button>
    </form>
  );
};

export default Login;
