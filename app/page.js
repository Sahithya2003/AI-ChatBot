"use client"
import React, { useState } from 'react';

async function sendChatQuery(message) {
  try {
    const response = await fetch('http://localhost:4000/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();
    console.log('Success:', data);
    
    return data.response; // Return the response message
  } catch (error) {
    console.error('Error:', error);
    return 'An error occurred';
  }
}

const Home = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendClick = async () => {
    setIsLoading(true);
    const botResponse = await sendChatQuery(inputMessage);
    console.log('Bot Response:', botResponse);

    const newMessage = { text: inputMessage, type: 'user' };
    const updatedMessages = [...messages, newMessage];
    if (botResponse) {
      updatedMessages.push({ text: botResponse, type: 'bot' });
    }

    setMessages(updatedMessages);
    setInputMessage('');
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-end h-screen p-6 bg-gray-950">
      <div className="py-2 px-4 bg-teal-600 w-full rounded-t-lg">
        <span className="text-3xl font-bold">Kimi</span>
      </div>
      <div className="flex-grow w-full mx-auto border border-white/30 rounded-b-lg overflow-hidden backdrop-blur-sm">
        <div className="flex flex-col gap-2 p-4">
          {messages.map((message, index) => (
            <div key={index} className={`p-2  rounded-lg ${message.type === 'user' ? 'bg-transparent text-white ' : 'bg-gray-900 text-white'}`}>
              <span className="text-sm font-bold rounded text-teal-600">{message.type === 'user' ? 'User:' : 'Bot:'}</span>
              <div>{message.text}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex mt-2 w-full">
        <input
          type="text"
          className="flex-grow p-2 border border-white/10 rounded-l-lg text-white bg-transparent "
          placeholder="Type a message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button
          onClick={handleSendClick}
          className={`bg-teal-600 text-white py-2 px-4 rounded-l-none rounded-r-lg ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
          disabled={isLoading}
        >
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>





  );
};

export default Home;

