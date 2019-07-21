import React from 'react';
import PropTypes from 'prop-types';

import './Notifier.css';

function Notifier({ onClick }) {
  const handleClick = e => {
    e.preventDefault();
    onClick();
  };

  return (
    <div className="notifier-container">
      <div className="notifier-box" onClick={handleClick}>
        {`New message arrived`}
      </div>
    </div>
  );
}

Notifier.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Notifier;
