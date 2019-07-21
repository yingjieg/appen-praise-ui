import React from 'react';

import './PraiseTile.css';
import avatarIcon from '../../../../assets/avatar.png';

function formattedDate(dateStr) {
  return new Date(dateStr).toLocaleDateString();
}

function getMentionedUserName(message) {
  if (!message) {
    return '';
  }
  
  const groups = message.match(/@([a-z0-9_-]*)/);

  return groups ? groups[0] : '';
}

function PraiseTile({ text, userName, createdAt }) {
  const metioned = getMentionedUserName(text);
  const message = metioned ? text.replace(metioned, '') : text;

  return (
    <div className="box" style={{}}>
      <div className="tile-avatar">
        <img src={avatarIcon} alt="profile avatar" />
      </div>
      <div className="tile-content">
        <p>
          <b className="tile-metioned-user">{metioned}</b> {message}
        </p>
        <br />
        <div className="tile-footer">
          <span style={{ float: 'right' }}>{userName}</span>
          {/*
            <span>{formattedDate(createdAt)}</span>
          */}
        </div>
      </div>
    </div>
  );
}

export default PraiseTile;
