import React, { useState } from 'react';

export default function Input({ onSendMessage }) {
  const [text, setText] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onSendMessage(text);
      setText('');
    }
  };

  return (
    <form className="input-form" onSubmit={submit}>
      <input
        className="input-field"
        placeholder="Type your message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit" className="send-btn">Send</button>
    </form>
  );
}
