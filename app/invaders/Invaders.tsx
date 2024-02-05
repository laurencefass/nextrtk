'use client'

import React, { useState, useEffect } from 'react';
import Player from './Player';
import './styles.css';

const Invaders = () => {
  const [playerPosition, setPlayerPosition] = useState({ x: 100 });

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "ArrowLeft") {
        setPlayerPosition(prev => ({ x: prev.x - 500 }));
      } else if (e.key === "ArrowRight") {
        setPlayerPosition(prev => ({ x: prev.x + 500 }));
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <div className="game">
      <Player position={playerPosition} />
    </div>
  );
};

export default Invaders;
