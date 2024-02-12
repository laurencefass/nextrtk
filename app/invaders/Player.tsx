// @ts-nocheck

import React from 'react';
import './Player.css'; // For player styling

const Player = ({ position }) => {
  return (
    <div className="player" style={{ left: `${position.x}px` }}></div>
  );
};

export default Player;