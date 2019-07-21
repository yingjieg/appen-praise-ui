import React from 'react';
import './Notifier.css';

function Notifier({ messageNumbers, onClick }) {
  const handleClick = e => {
    e.preventDefault();
    if (onClick) {
      onClick();
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 15,
        left: 'calc(50% - 160px)',
      }}
    >
      <div className="notifier-box" onClick={handleClick}>
        {`new message arrived`}
      </div>
    </div>
  );
}

export default Notifier;
