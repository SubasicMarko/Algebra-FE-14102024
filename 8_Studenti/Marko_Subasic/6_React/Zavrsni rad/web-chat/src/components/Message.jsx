import React from 'react';

export default function Message({ message, currentUser }) {
  const { member, text } = message;
  const isMe = member.id === currentUser.id;

  const bgColor = member.clientData?.color || '#ccc';

  // Function to determine text color based on background
  const getTextColor = (bg) => {
    // Simple luminance check
    const hex = bg.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 140 ? '#000000' : '#ffffff';
  };

  const textColor = getTextColor(bgColor);
  const displayName = member.clientData?.name || 'Unknown';

  return (
    <div className={`message ${isMe ? 'mine' : 'theirs'}`}>
     {!isMe && member.clientData?.avatar && (
  <img
    className="avatar-img"
    src={member.clientData.avatar}
    alt={member.clientData.name}
  />
)}
      <div
        className="message-content"
        style={{ backgroundColor: bgColor, color: textColor }}
      >
        <div className="username" style={{ fontWeight: 'bold' }}>
          {displayName}
        </div>
        <div className="text">{text}</div>
      </div>
    </div>
  );
}
