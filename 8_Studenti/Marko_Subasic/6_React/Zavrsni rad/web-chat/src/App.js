

//aJcrfpvCsKChOWqm


import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import { Input, Message } from './components';
import { initScaledrone, generateMember } from './services';

function App() {
  const [messages, setMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const droneRef = useRef(null);
  const roomRef = useRef(null);
  console.log('Test name:', generateMember());


  useEffect(() => {
    const member = generateMember();
    const drone = initScaledrone('aJcrfpvCsKChOWqm', member); // replace with your actual Scaledrone channel ID

    droneRef.current = drone;

    drone.on('open', error => {
      if (error) {
        console.error('Connection error:', error);
        return;
      }

      setCurrentUser({ id: drone.clientId, ...member });

      const room = drone.subscribe('observable-room');
      roomRef.current = room;

      room.on('data', (text, member) => {
        setMessages(prev => [...prev, { text, member }]);
      });
    });

    return () => {
      if (roomRef.current?.unsubscribe) roomRef.current.unsubscribe();
      if (droneRef.current?.close) droneRef.current.close();
    };
  }, []);

  const sendMessage = (message) => {
    if (droneRef.current) {
      droneRef.current.publish({
        room: 'observable-room',
        message,
      });
    }
  };

  return (
    <>
      <header className="chat-header">
        <h1>WebChat</h1>
        <div className="user-info">
          <span>{currentUser.name}</span>
          {currentUser.avatar && (
            <img
              src={currentUser.avatar}
              alt="Your avatar"
              className="user-avatar-header"
            />
          )}
        </div>

      </header>

      <div className="chat-wrapper">
        <div className="chat-container">
          <div className="chat-messages">
            {messages.map((m, i) => (
              <Message key={i} message={m} currentUser={currentUser} />
            ))}
          </div>
          <Input onSendMessage={sendMessage} />
        </div>
      </div>
    </>
  );


}

export default App;
