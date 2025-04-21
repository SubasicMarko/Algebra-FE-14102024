import React from 'react';
import Message from './Message';
import Input from './Input';

export default function Chat({ messages, member, onSendMessage }) {
  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg, idx) => (
          <Message key={idx} message={msg} currentUser={member} />
        ))}
      </div>
      <Input onSendMessage={onSendMessage} />
    </div>
  );
}
