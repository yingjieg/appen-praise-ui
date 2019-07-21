import React from 'react';

import './PraiseTile.css';
import avatarIcon from '../../../../assets/avatar.png';

function PraiseTile({ text, userName, createdAt }) {
  return (
    <div
      className="box"
      style={{
        margin: 10,
        display: 'flex',
        padding: '20px',
        //alignItems: 'center',
        width: 370,
        height: 120,
        borderRadius: '5px',
        color: 'rgba(0,0,0,0.65)',
        border: '1px solid #ebedf0',
      }}
    >
      <div className="title-avatar">
        <img
          src={avatarIcon}
          alt="profile avatar"
          style={{
            borderRadius: '50%',
            height: 60,
            width: 60,
          }}
        />
      </div>
      <div className="tile-content">
        <p
          style={{
            marginLeft: 16,
            fontSize: '1.2rem',
            fontFamily: 'Roboto", "Helvetica", "Arial", sans-serif',
            fontWeight: '400',
            lineHeight: '1.43',
            letterSpacing: '0.01071em',
          }}
        >
          <a href="https://www.google.com">@guoyj</a> Did you like those
          mockups? If yes, you can help
        </p>
      </div>
    </div>
  );
}

export default PraiseTile;
